import { useEffect, useRef } from "react";
import { create } from "zustand";
// Bundled with the app so tracking never depends on a third-party CDN.
import wasmLoaderPath from "@mediapipe/tasks-vision/vision_wasm_internal.js?url";
import wasmBinaryPath from "@mediapipe/tasks-vision/vision_wasm_internal.wasm?url";

import { easeFree, rollFromEyes, snapQuadrant } from "@/lib/face-tilt-math";

export { fitRotatedBox } from "@/lib/face-tilt-math";
export type FaceTiltMode = "snap" | "free";
export type FaceTiltStatus =
  "off" | "loading" | "tracking" | "lost" | "denied" | "unsupported" | "error";

export type FaceTiltState = {
  /** Rotation to apply to the reading surface, in degrees (CSS clockwise). */
  angle: number;
  status: FaceTiltStatus;
};

type Options = {
  enabled: boolean;
  mode: FaceTiltMode;
  invert: boolean;
};

/** MediaPipe Face Landmarker (float16), served from public/ so nothing is fetched from third parties. */
const MODEL_URL = "/models/face_landmarker.task";

/** Outer eye corners in the MediaPipe 478-point face mesh (the person's own right/left). */
const RIGHT_EYE = 33;
const LEFT_EYE = 263;

const SAMPLE_INTERVAL_MS = 120;
/** Keep the last angle this long after the face is lost, then ease back upright. */
const HOLD_AFTER_LOST_MS = 3000;

/** Live tracking state, readable from anywhere (toolbar, settings) without prop drilling. */
export const useFaceTiltRuntime = create<FaceTiltState>(() => ({ angle: 0, status: "off" }));

export function useFaceTilt({ enabled, mode, invert }: Options): FaceTiltState {
  const state = useFaceTiltRuntime();
  const setState = (next: FaceTiltState | ((prev: FaceTiltState) => FaceTiltState)) =>
    useFaceTiltRuntime.setState(
      typeof next === "function" ? next(useFaceTiltRuntime.getState()) : next,
    );
  const modeRef = useRef(mode);
  const invertRef = useRef(invert);
  modeRef.current = mode;
  invertRef.current = invert;

  useEffect(() => {
    if (!enabled) {
      setState({ angle: 0, status: "off" });
      return;
    }
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getUserMedia ||
      typeof WebAssembly === "undefined"
    ) {
      setState({ angle: 0, status: "unsupported" });
      return;
    }

    let cancelled = false;
    let stream: MediaStream | null = null;
    let landmarker: {
      detectForVideo: (v: HTMLVideoElement, t: number) => unknown;
      close: () => void;
    } | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let raw = 0;
    let smoothed = 0;
    let lastSeen = 0;
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");

    const stop = () => {
      if (timer) clearTimeout(timer);
      timer = null;
      landmarker?.close();
      landmarker = null;
      stream?.getTracks().forEach((track) => track.stop());
      stream = null;
      video.srcObject = null;
    };

    const tick = () => {
      if (cancelled || !landmarker) return;
      const now = performance.now();
      let seen = false;
      if (video.readyState >= 2 && !document.hidden) {
        try {
          const result = landmarker.detectForVideo(video, now) as {
            faceLandmarks?: Array<Array<{ x: number; y: number }>>;
          };
          const face = result.faceLandmarks?.[0];
          const right = face?.[RIGHT_EYE];
          const left = face?.[LEFT_EYE];
          if (right && left) {
            raw = rollFromEyes(right, left, invertRef.current);
            lastSeen = now;
            seen = true;
          }
        } catch {
          /* skip this frame */
        }
      }

      const lost = !seen && now - lastSeen > HOLD_AFTER_LOST_MS;
      const target = lost ? 0 : raw;
      smoothed =
        modeRef.current === "snap" ? snapQuadrant(target, smoothed) : easeFree(target, smoothed);

      setState((prev) => {
        const status: FaceTiltStatus = seen || !lost ? "tracking" : "lost";
        if (prev.angle === smoothed && prev.status === status) return prev;
        return { angle: smoothed, status };
      });
      timer = setTimeout(tick, SAMPLE_INTERVAL_MS);
    };

    setState({ angle: 0, status: "loading" });

    void (async () => {
      try {
        const [{ FaceLandmarker }, media] = await Promise.all([
          import("@mediapipe/tasks-vision"),
          navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user", width: { ideal: 320 }, height: { ideal: 240 } },
            audio: false,
          }),
        ]);
        if (cancelled) {
          media.getTracks().forEach((track) => track.stop());
          return;
        }
        stream = media;
        video.srcObject = media;
        await video.play();
        const fileset = { wasmLoaderPath, wasmBinaryPath };
        const create = (delegate: "GPU" | "CPU") =>
          FaceLandmarker.createFromOptions(fileset, {
            baseOptions: { modelAssetPath: MODEL_URL, delegate },
            runningMode: "VIDEO",
            numFaces: 1,
            outputFaceBlendshapes: false,
            outputFacialTransformationMatrixes: false,
          });
        // WebGL can be unavailable (older WebViews, headless); fall back to the CPU delegate.
        const created = await create("GPU").catch(() => create("CPU"));
        if (cancelled) {
          created.close();
          stop();
          return;
        }
        landmarker = created;
        lastSeen = performance.now();
        tick();
      } catch (error) {
        if (cancelled) return;
        stop();
        const name = error instanceof Error ? error.name : "";
        const status: FaceTiltStatus =
          name === "NotAllowedError" || name === "SecurityError"
            ? "denied"
            : name === "NotFoundError" || name === "OverconstrainedError"
              ? "unsupported"
              : "error";
        setState({ angle: 0, status });
      }
    })();

    return () => {
      cancelled = true;
      stop();
    };
  }, [enabled]);

  return state;
}

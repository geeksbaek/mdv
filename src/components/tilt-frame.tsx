import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { coarsen, fitRotatedBox } from "@/lib/face-tilt";

type Props = {
  angle: number;
  active: boolean;
  children: ReactNode;
};

/**
 * Rotates the reading surface to follow the viewer's face. The inner box is
 * resized so it always fits the viewport after rotation, keeping text at its
 * real size instead of scaling it.
 */
export function TiltFrame({ angle, active, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    const update = () => setSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  if (!active) {
    return <div className="h-full min-w-0">{children}</div>;
  }

  const exact = size.width > 0 ? fitRotatedBox(size.width, size.height, angle) : size;
  // At right angles fill the viewport exactly; in between, change the box only in coarse steps
  // so text doesn't rewrap on every degree of head movement.
  const box =
    angle % 90 === 0 ? exact : { width: coarsen(exact.width), height: coarsen(exact.height) };
  const style: CSSProperties = {
    width: box.width,
    height: box.height,
    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
  };

  return (
    <div ref={ref} className="md-tilt-viewport">
      <div className="md-tilt-box" style={style}>
        {children}
      </div>
    </div>
  );
}

import assert from "node:assert/strict";
import { test } from "node:test";
import {
  decodeSharePayload,
  encodeSharePayload,
  longShareUrl,
  readEncodedFromLocation,
  shortShareUrl,
  snapshotSettings,
  type ShareSettings,
} from "./share.ts";
import { SAMPLE_DOCUMENT } from "./sample-document.ts";

const settings: ShareSettings = snapshotSettings({
  preset: "ink",
  colors: {
    bg: "#161513",
    fg: "#ece7df",
    muted: "#a39b90",
    accent: "#c4cdd8",
    link: "#9db4ce",
    codeBg: "#211f1c",
    heading: "#f4efe6",
  },
  bodyFont: "gowun-batang",
  headingFont: "match-body",
  monoFont: "nanum-gothic-coding",
  fontSize: 18,
  fontWeight: 500,
  headingWeight: 700,
  lineHeight: 1.9,
  letterSpacing: 0.01,
  paragraphSpacing: 1,
  maxWidth: 48,
  wordBreak: "keep-all",
  lineBreak: "strict",
  hangingPunctuation: true,
  cjkFriendly: true,
  softBreaks: false,
  contentLang: "ko",
});

test("encode/decode roundtrips korean markdown and settings", async () => {
  const payload = await encodeSharePayload({
    markdown: SAMPLE_DOCUMENT,
    fileName: "공유.md",
    settings,
  });
  assert.match(payload, /^[A-Za-z0-9_-]+$/);
  assert.ok(payload.length > 8);
  const decoded = await decodeSharePayload(payload);
  assert.ok(decoded);
  assert.equal(decoded.markdown, SAMPLE_DOCUMENT);
  assert.equal(decoded.fileName, "공유.md");
  assert.equal(decoded.settings?.preset, "ink");
  assert.equal(decoded.settings?.fontSize, 18);
  assert.equal(decoded.settings?.fontWeight, 500);
  assert.equal(decoded.settings?.headingWeight, 700);
  assert.equal(decoded.settings?.cjkFriendly, true);
});

test("decode rejects garbage", async () => {
  assert.equal(await decodeSharePayload(""), null);
  assert.equal(await decodeSharePayload("!!!!"), null);
  assert.equal(await decodeSharePayload("not-deflate"), null);
});

test("omitting settings stays omitted", async () => {
  const payload = await encodeSharePayload({ markdown: "본문", fileName: "a.md" });
  const decoded = await decodeSharePayload(payload);
  assert.equal(decoded?.markdown, "본문");
  assert.equal(decoded?.settings, undefined);
});

test("url helpers", () => {
  assert.equal(shortShareUrl("https://hanji.app", "AbC123xy"), "https://hanji.app/s/AbC123xy");
  assert.equal(longShareUrl("https://hanji.app", "eNq"), "https://hanji.app/#d=eNq");
  assert.equal(readEncodedFromLocation({ search: "?d=abc", hash: "" }), "abc");
  assert.equal(readEncodedFromLocation({ search: "", hash: "#d=xyz" }), "xyz");
});

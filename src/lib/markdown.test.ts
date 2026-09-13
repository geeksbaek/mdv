import assert from "node:assert/strict";
import { test } from "node:test";
import { pageTitle, primaryHeading, renderMarkdown, toggleTaskAt } from "./markdown.ts";

const CASES: Array<{ name: string; source: string; tag: "strong" | "em" | "s" }> = [
  {
    name: "Korean particle after closing paren",
    source: "**JWT(JSON Web Token)**는 인증에 쓰입니다.",
    tag: "strong",
  },
  {
    name: "Korean period then hangul",
    source: "**중요한 결정.**바로",
    tag: "strong",
  },
  {
    name: "Korean fullwidth paren gloss",
    source: "**이 용어（읽기）**에 대해",
    tag: "strong",
  },
  {
    name: "Korean paren before following sentence",
    source: "**별표는 강조로 인식되지 않습니다(이 괄호 때문에)**이 문장 때문에.",
    tag: "strong",
  },
  {
    name: "Japanese ideographic period",
    source: "**このアスタリスクは強調記号として認識されず、そのまま表示されます。**この文のせいで。",
    tag: "strong",
  },
  {
    name: "Japanese gloss parens",
    source: "**この用語（読み方など）**について説明します。",
    tag: "strong",
  },
  {
    name: "Chinese period then hanzi",
    source: "**该星号不会被识别，而是直接显示。**这是因为它没有被识别为强调符号。",
    tag: "strong",
  },
  {
    name: "Korean italic + particle",
    source: "*강조 표시*입니다",
    tag: "em",
  },
  {
    name: "Korean strikethrough + following hangul",
    source: "~~초안입니다。~~다음",
    tag: "s",
  },
];

for (const item of CASES) {
  test(`cjk-friendly: ${item.name}`, () => {
    const on = renderMarkdown(item.source, { cjkFriendly: true, softBreaks: false }).html;
    assert.match(on, new RegExp(`<${item.tag}>`));
    assert.doesNotMatch(on, /\*\*|~~/);
  });
}

test("disabling the plugin restores CommonMark failure on punctuation+CJK", () => {
  const source = "**太字。**テスト";
  const off = renderMarkdown(source, { cjkFriendly: false, softBreaks: false }).html;
  const on = renderMarkdown(source, { cjkFriendly: true, softBreaks: false }).html;
  assert.match(off, /\*\*/);
  assert.doesNotMatch(off, /<strong>/);
  assert.match(on, /<strong>/);
});

test("task toggle flips the nth checkbox", () => {
  const src = "- [ ] one\n- [x] two\n- [ ] three\n";
  assert.equal(toggleTaskAt(src, 1), "- [ ] one\n- [ ] two\n- [ ] three\n");
  assert.equal(toggleTaskAt(src, 0), "- [x] one\n- [x] two\n- [ ] three\n");
});

test("page title prefers the first h1 then any heading", () => {
  const h1 = renderMarkdown("# 봄날\n\n본문", { cjkFriendly: true, softBreaks: false });
  assert.equal(pageTitle(h1.headings, "제목 없는 문서"), "봄날");
  assert.equal(primaryHeading(h1.headings), "봄날");

  const h2 = renderMarkdown("본문\n\n## 둘째 제목", { cjkFriendly: true, softBreaks: false });
  assert.equal(pageTitle(h2.headings, "제목 없는 문서"), "둘째 제목");

  const empty = renderMarkdown("제목 없이 본문만.", { cjkFriendly: true, softBreaks: false });
  assert.equal(primaryHeading(empty.headings), undefined);
  assert.equal(pageTitle(empty.headings, "제목 없는 문서"), "제목 없는 문서");
});

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { extractBlocks } from "./markdown.ts";

const opts = { cjkFriendly: true, softBreaks: false };

describe("extractBlocks", () => {
  it("flattens headings, paragraphs, lists, quotes and code", () => {
    const blocks = extractBlocks(
      "# 제목\n\n본문 **강조** 와 `코드`.\n\n- 하나\n- 둘\n  1. 셋\n\n> 인용\n\n```js\nlet a = 1;\n```\n",
      opts,
    );
    assert.deepEqual(
      blocks.map((b) => [b.kind, b.text, b.depth]),
      [
        ["h1", "제목", 0],
        ["p", "본문 강조 와 코드.", 0],
        ["li", "• 하나", 0],
        ["li", "• 둘", 0],
        ["li", "1. 셋", 1],
        ["quote", "인용", 1],
        ["code", "let a = 1;", 0],
      ],
    );
  });

  it("turns table rows into lines and keeps image alt text", () => {
    const blocks = extractBlocks("| a | b |\n|---|---|\n| 1 | 2 |\n\n![그림](x.png)\n", opts);
    assert.deepEqual(
      blocks.map((b) => b.text),
      ["a  |  b", "1  |  2", "[그림]"],
    );
  });
});

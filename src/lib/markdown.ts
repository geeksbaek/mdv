import MarkdownIt from "markdown-it";
import type {
  MarkdownIt as MarkdownItType,
  RendererRule,
  StateBlock,
  StateCore,
  StateInline,
  Token,
} from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItCjkFriendly from "markdown-it-cjk-friendly";
import markdownItFootnote from "markdown-it-footnote";
import hljs from "highlight.js";
import katex from "katex";

export type Heading = {
  id: string;
  level: number;
  text: string;
};

export type RenderOptions = {
  cjkFriendly: boolean;
  softBreaks: boolean;
};

export type RenderResult = {
  html: string;
  headings: Heading[];
};

type ParserCache = {
  key: string;
  md: MarkdownItType;
};

let cache: ParserCache | null = null;

function slugify(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}\p{M}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "section";
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;")
    .replace(/"/g, "&" + "quot;");
}

function highlight(code: string, lang: string): string {
  const key = lang.trim().toLowerCase();
  if (!key) return escapeHtml(code);
  try {
    if (hljs.getLanguage(key)) {
      return hljs.highlight(code, { language: key, ignoreIllegals: true }).value;
    }
  } catch {
    /* fall through */
  }
  return escapeHtml(code);
}

function mathBlockPlugin(md: MarkdownItType) {
  md.block.ruler.before(
    "fence",
    "math_block",
    (state: StateBlock, start: number, end: number, silent: boolean) => {
      const startInfo = state.getLines(start, start + 1, 0, false).trim();
      if (startInfo !== "$$") return false;
      let next = start + 1;
      while (next < end) {
        const line = state.getLines(next, next + 1, 0, false).trim();
        if (line === "$$") break;
        next += 1;
      }
      if (next >= end) return false;
      if (silent) return true;
      const content = state.getLines(start + 1, next, 0, false);
      const token = state.push("math_block", "div", 0);
      token.markup = "$$";
      token.content = content.trim();
      token.map = [start, next + 1];
      token.block = true;
      state.line = next + 1;
      return true;
    },
  );

  md.renderer.rules.math_block = (tokens: Token[], idx: number) => {
    const tex = tokens[idx]?.content ?? "";
    try {
      return `<div class="md-math md-math-block">${katex.renderToString(tex, {
        displayMode: true,
        throwOnError: false,
        output: "html",
      })}</div>\n`;
    } catch {
      return `<pre class="md-math-error">${md.utils.escapeHtml(tex)}</pre>\n`;
    }
  };
}

function mathInlinePlugin(md: MarkdownItType) {
  md.inline.ruler.after("escape", "math_inline", (state: StateInline, silent: boolean) => {
    if (state.src[state.pos] !== "$") return false;
    if (state.src[state.pos + 1] === "$") return false;
    const start = state.pos + 1;
    let pos = start;
    let found = -1;
    while (pos < state.posMax) {
      const ch = state.src[pos];
      if (ch === "\\") {
        pos += 2;
        continue;
      }
      if (ch === "$") {
        found = pos;
        break;
      }
      pos += 1;
    }
    if (found < 0) return false;
    const tex = state.src.slice(start, found);
    if (!tex || tex.startsWith(" ") || tex.endsWith(" ")) return false;
    if (!silent) {
      const token = state.push("math_inline", "span", 0);
      token.markup = "$";
      token.content = tex;
    }
    state.pos = found + 1;
    return true;
  });

  md.renderer.rules.math_inline = (tokens: Token[], idx: number) => {
    const tex = tokens[idx]?.content ?? "";
    try {
      return katex.renderToString(tex, {
        displayMode: false,
        throwOnError: false,
        output: "html",
      });
    } catch {
      return `<code>${md.utils.escapeHtml(tex)}</code>`;
    }
  };
}

function strikethroughPlugin(md: MarkdownItType) {
  md.inline.ruler.after("emphasis", "strikethrough", (state: StateInline, silent: boolean) => {
    const start = state.pos;
    if (state.src.charCodeAt(start) !== 0x7e || state.src.charCodeAt(start + 1) !== 0x7e) {
      return false;
    }
    if (state.src.charCodeAt(start + 2) === 0x7e) return false;

    let pos = start + 2;
    let found = -1;
    while (pos < state.posMax - 1) {
      if (state.src.charCodeAt(pos) === 0x5c) {
        pos += 2;
        continue;
      }
      if (state.src.charCodeAt(pos) === 0x7e && state.src.charCodeAt(pos + 1) === 0x7e) {
        if (state.src.charCodeAt(pos + 2) === 0x7e) {
          pos += 1;
          continue;
        }
        found = pos;
        break;
      }
      pos += 1;
    }
    if (found < 0 || found === start + 2) return false;
    if (silent) return true;

    const max = state.posMax;
    const tokenOpen = state.push("s_open", "s", 1);
    tokenOpen.markup = "~~";
    state.pos = start + 2;
    state.posMax = found;
    state.md.inline.tokenize(state);
    state.posMax = max;
    const tokenClose = state.push("s_close", "s", -1);
    tokenClose.markup = "~~";
    state.pos = found + 2;
    return true;
  });
}

function taskListPlugin(md: MarkdownItType) {
  md.core.ruler.after("inline", "task-lists", (state: StateCore) => {
    let index = 0;
    const tokens = state.tokens;
    for (let i = 2; i < tokens.length; i++) {
      const inline = tokens[i];
      const paragraph = tokens[i - 1];
      const item = tokens[i - 2];
      if (
        inline?.type !== "inline" ||
        paragraph?.type !== "paragraph_open" ||
        item?.type !== "list_item_open"
      ) {
        continue;
      }
      const children = inline.children;
      if (!children?.length) continue;
      const first = children[0];
      if (first?.type !== "text") continue;
      const match = first.content.match(/^\[([ xX])\]\s+/);
      if (!match) continue;
      const checked = match[1] !== " ";
      first.content = first.content.slice(match[0].length);
      item.attrJoin("class", "md-task-item");
      const checkbox = new state.Token("html_inline", "", 0);
      checkbox.content = `<input type="checkbox" data-task-index="${index}"${checked ? " checked" : ""}>`;
      children.unshift(checkbox);
      index += 1;
    }
  });
}

function collectHeadings(tokens: Token[]): Heading[] {
  const headings: Heading[] = [];
  const used = new Map<string, number>();
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token?.type !== "heading_open") continue;
    const level = Number(token.tag.slice(1));
    const inline = tokens[i + 1];
    const text =
      inline?.children
        ?.filter((child) => child.type === "text" || child.type === "code_inline")
        .map((child) => String(child.content))
        .join("") ?? "";
    let id = String(token.attrGet("id") ?? slugify(text));
    const seen = used.get(id) ?? 0;
    if (seen > 0) {
      id = `${id}-${seen + 1}`;
    }
    used.set(String(token.attrGet("id") ?? slugify(text)), seen + 1);
    headings.push({ id, level, text });
  }
  return headings;
}

function createParser(options: RenderOptions): MarkdownItType {
  const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: false,
    breaks: options.softBreaks,
    highlight: (code, lang) => {
      if (lang.trim().toLowerCase() === "mermaid") {
        return escapeHtml(code);
      }
      return highlight(code, lang);
    },
  });

  if (options.cjkFriendly) {
    md.use(markdownItCjkFriendly);
  }

  md.use(markdownItAnchor, {
    slugify,
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      symbol: "#",
      placement: "after",
      ariaHidden: true,
      class: "md-anchor",
    }),
    tabIndex: false,
  });
  md.use(markdownItFootnote);
  md.use(strikethroughPlugin);
  md.use(taskListPlugin);
  md.use(mathBlockPlugin);
  md.use(mathInlinePlugin);

  const fallbackRender: RendererRule = (tokens, idx, opts, env, self) =>
    self.renderToken(tokens, idx, opts);

  const defaultFence = md.renderer.rules.fence ?? fallbackRender;

  md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    if (!token) return "";
    const lang = token.info.trim().split(/\s+/)[0] ?? "";
    if (lang.toLowerCase() === "mermaid") {
      return `<pre class="md-mermaid"><code class="language-mermaid">${md.utils.escapeHtml(token.content)}</code></pre>\n`;
    }
    const raw = defaultFence(tokens, idx, opts, env, self);
    const label = lang || "text";
    return `<div class="md-code"><div class="md-code-bar"><span>${md.utils.escapeHtml(label)}</span><button type="button" class="md-copy" data-copy>복사</button></div>${raw}</div>\n`;
  };

  const defaultLinkOpen = md.renderer.rules.link_open ?? fallbackRender;

  md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    const href = String(token?.attrGet("href") ?? "");
    if (/^https?:/i.test(href)) {
      token?.attrSet("target", "_blank");
      token?.attrSet("rel", "noopener noreferrer");
    }
    return defaultLinkOpen(tokens, idx, opts, env, self);
  };

  const defaultTableOpen = md.renderer.rules.table_open ?? fallbackRender;
  md.renderer.rules.table_open = (tokens, idx, opts, env, self) =>
    `<div class="md-table-wrap">${defaultTableOpen(tokens, idx, opts, env, self)}`;
  const defaultTableClose = md.renderer.rules.table_close ?? fallbackRender;
  md.renderer.rules.table_close = (tokens, idx, opts, env, self) =>
    `${defaultTableClose(tokens, idx, opts, env, self)}</div>`;

  return md;
}

function getParser(options: RenderOptions): MarkdownItType {
  const key = `${options.cjkFriendly ? 1 : 0}:${options.softBreaks ? 1 : 0}`;
  if (cache?.key === key) return cache.md;
  const md = createParser(options);
  cache = { key, md };
  return md;
}

export function renderMarkdown(source: string, options: RenderOptions): RenderResult {
  const md = getParser(options);
  const env: Record<string, unknown> = {};
  const tokens = md.parse(source, env);
  const html = md.renderer.render(tokens, md.options, env);
  const headings = collectHeadings(tokens);
  return { html, headings };
}

export type TextBlockKind = "h1" | "h2" | "h3" | "p" | "li" | "quote" | "code";

export type TextBlock = {
  kind: TextBlockKind;
  text: string;
  /** Nesting depth for list items and quotes (0 = top level). */
  depth: number;
};

function inlineText(token: Token): string {
  const children = token.children;
  if (!children) return token.content;
  let out = "";
  for (const child of children) {
    switch (child.type) {
      case "text":
      case "code_inline":
      case "math_inline":
        out += child.content;
        break;
      case "softbreak":
      case "hardbreak":
        out += " ";
        break;
      case "image":
        out += child.content ? `[${child.content}]` : "";
        break;
      case "footnote_ref":
        out += `[${String(child.meta?.label ?? child.meta?.id ?? "")}]`;
        break;
      default:
        if (child.children) out += inlineText(child);
        break;
    }
  }
  return out.replace(/\s+/g, " ").trim();
}

/**
 * Flatten a document into plain-text blocks for layout engines that only
 * understand text (the tilted reader). Inline formatting is dropped; tables
 * become one line per row; code keeps its line breaks.
 */
export function extractBlocks(source: string, options: RenderOptions): TextBlock[] {
  const md = getParser(options);
  const tokens = md.parse(source, {});
  const blocks: TextBlock[] = [];
  let listDepth = 0;
  let quoteDepth = 0;
  let headingLevel: TextBlockKind | null = null;
  const ordered: number[] = [];
  let pendingPrefix = "";
  const row: string[] = [];
  let inTable = false;

  const push = (kind: TextBlockKind, text: string) => {
    if (!text) return;
    blocks.push({ kind, text, depth: Math.max(0, listDepth - 1) + quoteDepth });
  };

  for (const token of tokens) {
    switch (token.type) {
      case "heading_open": {
        const level = Number(token.tag.slice(1));
        headingLevel = level <= 1 ? "h1" : level === 2 ? "h2" : "h3";
        break;
      }
      case "heading_close":
        headingLevel = null;
        break;
      case "bullet_list_open":
        listDepth += 1;
        ordered.push(0);
        break;
      case "ordered_list_open":
        listDepth += 1;
        ordered.push(Number(token.attrGet("start") ?? 1));
        break;
      case "bullet_list_close":
      case "ordered_list_close":
        listDepth -= 1;
        ordered.pop();
        break;
      case "list_item_open": {
        const n = ordered[ordered.length - 1] ?? 0;
        if (n > 0) {
          pendingPrefix = `${n}. `;
          ordered[ordered.length - 1] = n + 1;
        } else {
          pendingPrefix = "• ";
        }
        break;
      }
      case "blockquote_open":
        quoteDepth += 1;
        break;
      case "blockquote_close":
        quoteDepth -= 1;
        break;
      case "table_open":
        inTable = true;
        break;
      case "table_close":
        inTable = false;
        break;
      case "tr_close":
        push("p", row.join("  |  "));
        row.length = 0;
        break;
      case "inline": {
        const text = inlineText(token);
        if (inTable) {
          row.push(text);
        } else if (headingLevel) {
          push(headingLevel, text);
        } else if (listDepth > 0) {
          push("li", pendingPrefix + text);
          pendingPrefix = "";
        } else if (quoteDepth > 0) {
          push("quote", text);
        } else {
          push("p", text);
        }
        break;
      }
      case "fence":
      case "code_block":
      case "math_block":
        push("code", token.content.replace(/\n+$/, ""));
        break;
      default:
        break;
    }
  }
  return blocks;
}

export function primaryHeading(headings: Heading[]): string | undefined {
  const preferred = headings.find((item) => item.level === 1) ?? headings[0];
  const text = preferred?.text.replace(/\s+/g, " ").trim();
  return text || undefined;
}

/**
 * The document's title read straight from the source: the first ATX or setext
 * H1, falling back to the first heading of any level. Cheap enough to run on
 * every keystroke, unlike a full render, so file names can follow the title.
 */
export function sourceTitle(markdown: string): string | undefined {
  const lines = markdown.split(/\r?\n/);
  let first: string | undefined;
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    if (/^\s{0,3}(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const atx = /^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
    if (atx) {
      const text = plainInline(atx[2]!);
      if (!text) continue;
      if (atx[1]!.length === 1) return text;
      first ??= text;
      continue;
    }
    const next = lines[i + 1];
    if (next && /^\s{0,3}=+\s*$/.test(next) && line.trim()) {
      const text = plainInline(line);
      if (text) return text;
    }
    if (next && /^\s{0,3}-+\s*$/.test(next) && line.trim() && !/^\s{0,3}-/.test(line)) {
      const text = plainInline(line);
      if (text) first ??= text;
    }
  }
  return first;
}

/** Heading text without its inline markup, for titles and file names. */
function plainInline(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]+/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * The name a document saves under when it has none of its own: its title
 * (see `sourceTitle`) as a safe file name, else `fallback`, plus `.md`.
 */
export function defaultFileName(markdown: string, fallback: string): string {
  const title = sourceTitle(markdown) ?? fallback;
  const safe = title
    .replace(/[/\\:*?"<>|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80)
    .trim();
  return `${safe || fallback}.md`;
}

export function pageTitle(headings: Heading[], fallback: string): string {
  return primaryHeading(headings) ?? fallback;
}

export function toggleTaskAt(source: string, index: number): string {
  const pattern = /^(\s*(?:[-*+]|\d+[.)])\s+)\[([ xX])\]/gm;
  let current = 0;
  return source.replace(pattern, (full, prefix: string, mark: string) => {
    if (current++ !== index) return full;
    const next = mark === " " ? "x" : " ";
    return `${prefix}[${next}]`;
  });
}

export function containsMermaid(html: string): boolean {
  return html.includes("language-mermaid");
}

export type FontEntry = {
  id: string;
  name: string;
  stack: string;
  href?: string;
  category: "sans" | "serif" | "mono";
  scripts: Array<"ko" | "ja" | "zh" | "latin">;
};

const CJK_SANS_FALLBACK =
  '"Apple SD Gothic Neo", "Malgun Gothic", "Hiragino Sans", "Noto Sans KR", "Noto Sans JP", "Noto Sans SC", sans-serif';
const CJK_SERIF_FALLBACK =
  '"Apple Myungjo", "Batang", "Hiragino Mincho ProN", "Noto Serif KR", "Noto Serif JP", "Noto Serif SC", serif';
const MONO_FALLBACK =
  'ui-monospace, "SF Mono", Menlo, Consolas, "Nanum Gothic Coding", monospace';

function google(families: string): string {
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

export const FONTS: FontEntry[] = [
  {
    id: "pretendard",
    name: "Pretendard",
    category: "sans",
    scripts: ["ko", "ja", "latin"],
    stack: `"Pretendard Variable", Pretendard, ${CJK_SANS_FALLBACK}`,
    href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css",
  },
  {
    id: "suit",
    name: "SUIT",
    category: "sans",
    scripts: ["ko", "latin"],
    stack: `SUIT, ${CJK_SANS_FALLBACK}`,
    href: "https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css",
  },
  {
    id: "ibm-plex-sans-kr",
    name: "IBM Plex Sans KR",
    category: "sans",
    scripts: ["ko", "latin"],
    stack: `"IBM Plex Sans KR", ${CJK_SANS_FALLBACK}`,
    href: google("family=IBM+Plex+Sans+KR:wght@300;400;500;600;700"),
  },
  {
    id: "noto-sans-kr",
    name: "Noto Sans KR",
    category: "sans",
    scripts: ["ko", "latin"],
    stack: `"Noto Sans KR", ${CJK_SANS_FALLBACK}`,
    href: google("family=Noto+Sans+KR:wght@300;400;500;600;700"),
  },
  {
    id: "noto-sans-jp",
    name: "Noto Sans JP",
    category: "sans",
    scripts: ["ja", "latin"],
    stack: `"Noto Sans JP", ${CJK_SANS_FALLBACK}`,
    href: google("family=Noto+Sans+JP:wght@300;400;500;600;700"),
  },
  {
    id: "noto-sans-sc",
    name: "Noto Sans SC",
    category: "sans",
    scripts: ["zh", "latin"],
    stack: `"Noto Sans SC", ${CJK_SANS_FALLBACK}`,
    href: google("family=Noto+Sans+SC:wght@300;400;500;600;700"),
  },
  {
    id: "noto-sans-tc",
    name: "Noto Sans TC",
    category: "sans",
    scripts: ["zh", "latin"],
    stack: `"Noto Sans TC", ${CJK_SANS_FALLBACK}`,
    href: google("family=Noto+Sans+TC:wght@300;400;500;600;700"),
  },
  {
    id: "gowun-dodum",
    name: "고운돋움",
    category: "sans",
    scripts: ["ko", "latin"],
    stack: `"Gowun Dodum", ${CJK_SANS_FALLBACK}`,
    href: google("family=Gowun+Dodum&display=swap"),
  },
  {
    id: "gowun-batang",
    name: "고운바탕",
    category: "serif",
    scripts: ["ko", "latin"],
    stack: `"Gowun Batang", ${CJK_SERIF_FALLBACK}`,
    href: google("family=Gowun+Batang:wght@400;700"),
  },
  {
    id: "noto-serif-kr",
    name: "Noto Serif KR",
    category: "serif",
    scripts: ["ko", "latin"],
    stack: `"Noto Serif KR", ${CJK_SERIF_FALLBACK}`,
    href: google("family=Noto+Serif+KR:wght@300;400;500;600;700"),
  },
  {
    id: "noto-serif-jp",
    name: "Noto Serif JP",
    category: "serif",
    scripts: ["ja", "latin"],
    stack: `"Noto Serif JP", ${CJK_SERIF_FALLBACK}`,
    href: google("family=Noto+Serif+JP:wght@300;400;500;600;700"),
  },
  {
    id: "noto-serif-sc",
    name: "Noto Serif SC",
    category: "serif",
    scripts: ["zh", "latin"],
    stack: `"Noto Serif SC", ${CJK_SERIF_FALLBACK}`,
    href: google("family=Noto+Serif+SC:wght@300;400;500;600;700"),
  },
  {
    id: "noto-serif-tc",
    name: "Noto Serif TC",
    category: "serif",
    scripts: ["zh", "latin"],
    stack: `"Noto Serif TC", ${CJK_SERIF_FALLBACK}`,
    href: google("family=Noto+Serif+TC:wght@300;400;500;600;700"),
  },
  {
    id: "hahmlet",
    name: "Hahmlet",
    category: "serif",
    scripts: ["ko", "latin"],
    stack: `Hahmlet, ${CJK_SERIF_FALLBACK}`,
    href: google("family=Hahmlet:wght@300;400;500;600;700"),
  },
  {
    id: "song-myung",
    name: "송명",
    category: "serif",
    scripts: ["ko", "latin"],
    stack: `"Song Myung", ${CJK_SERIF_FALLBACK}`,
    href: google("family=Song+Myung"),
  },
  {
    id: "nanum-myeongjo",
    name: "나눔명조",
    category: "serif",
    scripts: ["ko", "latin"],
    stack: `"Nanum Myeongjo", ${CJK_SERIF_FALLBACK}`,
    href: google("family=Nanum+Myeongjo:wght@400;700"),
  },
  {
    id: "shippori-mincho",
    name: "しっぽり明朝",
    category: "serif",
    scripts: ["ja", "latin"],
    stack: `"Shippori Mincho", ${CJK_SERIF_FALLBACK}`,
    href: google("family=Shippori+Mincho:wght@400;500;600;700"),
  },
  {
    id: "system-sans",
    name: "시스템 고딕",
    category: "sans",
    scripts: ["ko", "ja", "zh", "latin"],
    stack: `system-ui, ${CJK_SANS_FALLBACK}`,
  },
  {
    id: "system-serif",
    name: "시스템 명조",
    category: "serif",
    scripts: ["ko", "ja", "zh", "latin"],
    stack: `ui-serif, ${CJK_SERIF_FALLBACK}`,
  },
  {
    id: "ibm-plex-mono",
    name: "IBM Plex Mono",
    category: "mono",
    scripts: ["latin"],
    stack: `"IBM Plex Mono", ${MONO_FALLBACK}`,
    href: google("family=IBM+Plex+Mono:wght@400;500;600"),
  },
  {
    id: "jetbrains-mono",
    name: "JetBrains Mono",
    category: "mono",
    scripts: ["latin"],
    stack: `"JetBrains Mono", ${MONO_FALLBACK}`,
    href: google("family=JetBrains+Mono:wght@400;500;600"),
  },
  {
    id: "nanum-gothic-coding",
    name: "나눔고딕코딩",
    category: "mono",
    scripts: ["ko", "latin"],
    stack: `"Nanum Gothic Coding", ${MONO_FALLBACK}`,
    href: google("family=Nanum+Gothic+Coding:wght@400;700"),
  },
  {
    id: "system-mono",
    name: "시스템 모노",
    category: "mono",
    scripts: ["ko", "ja", "zh", "latin"],
    stack: MONO_FALLBACK,
  },
];

export const FONT_BY_ID = new Map(FONTS.map((f) => [f.id, f]));

export function fontStack(id: string, fallbackId: string): string {
  return FONT_BY_ID.get(id)?.stack ?? FONT_BY_ID.get(fallbackId)?.stack ?? CJK_SANS_FALLBACK;
}

export const BODY_FONTS = FONTS.filter((f) => f.category !== "mono");
export const MONO_FONTS = FONTS.filter((f) => f.category === "mono");

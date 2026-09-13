export type ThemeColors = {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  link: string;
  codeBg: string;
  heading: string;
};

export type ThemePreset = {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
};

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "hanji",
    name: "한지",
    description: "따뜻한 닥종이",
    colors: {
      bg: "#f3eee4",
      fg: "#1c1917",
      muted: "#6b635b",
      accent: "#4a5a6a",
      link: "#3d5a80",
      codeBg: "#e7e0d3",
      heading: "#1c1917",
    },
  },
  {
    id: "snow",
    name: "눈",
    description: "맑은 흰 지면",
    colors: {
      bg: "#f7f7f4",
      fg: "#1a1a18",
      muted: "#6a6a64",
      accent: "#3f4a56",
      link: "#2c4a6e",
      codeBg: "#ecece7",
      heading: "#111110",
    },
  },
  {
    id: "sepia",
    name: "세피아",
    description: "오래된 책",
    colors: {
      bg: "#f0e6d2",
      fg: "#3f2e1e",
      muted: "#7a654c",
      accent: "#6b4f32",
      link: "#6b4423",
      codeBg: "#e4d6bc",
      heading: "#2c1e12",
    },
  },
  {
    id: "ink",
    name: "먹",
    description: "깊은 먹물",
    colors: {
      bg: "#161513",
      fg: "#ece7df",
      muted: "#a39b90",
      accent: "#c4cdd8",
      link: "#9db4ce",
      codeBg: "#211f1c",
      heading: "#f4efe6",
    },
  },
  {
    id: "night",
    name: "밤",
    description: "남색 야간",
    colors: {
      bg: "#0e1116",
      fg: "#e7e9ee",
      muted: "#8b93a1",
      accent: "#a8b4c4",
      link: "#8fb0d4",
      codeBg: "#161b22",
      heading: "#f0f2f5",
    },
  },
  {
    id: "contrast",
    name: "고대비",
    description: "흑백 대비",
    colors: {
      bg: "#000000",
      fg: "#ffffff",
      muted: "#c8c8c8",
      accent: "#ffffff",
      link: "#9cdcff",
      codeBg: "#161616",
      heading: "#ffffff",
    },
  },
];

export const THEME_BY_ID = new Map(THEME_PRESETS.map((t) => [t.id, t]));
export const DEFAULT_THEME = THEME_PRESETS[0]!;

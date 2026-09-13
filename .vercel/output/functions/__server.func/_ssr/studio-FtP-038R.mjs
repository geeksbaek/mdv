import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as DialogOverlay$1, c as DialogTrigger, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Trigger, i as Root2, n as Item2, r as Portal2, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as RotateCcw, c as Link2, d as Ellipsis, f as Download, h as Check, i as Settings2, l as FolderOpen, m as Columns2, o as Printer, p as Copy, r as Share2, s as PanelLeft, t as X, u as Eye } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as TooltipContent, c as createShare, i as Tooltip, o as TooltipTrigger, s as cn } from "./router-DORzhVoT.mjs";
import { n as nn, r as qt, t as Qt } from "../_libs/react-resizable-panels.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as MarkdownItCallable } from "../_libs/markdown-it+mdurl+punycode.js.mjs";
import { t as b } from "../_libs/markdown-it-anchor.mjs";
import { t as markdownItCjkFriendlyPlugin } from "../_libs/markdown-it-cjk-friendly.mjs";
import { t as footnote_plugin } from "../_libs/markdown-it-footnote.mjs";
import { t as es_default } from "../_libs/highlight.js.mjs";
import { n as katex } from "../_libs/katex.mjs";
import { a as Viewport, i as ScrollAreaThumb, n as Root, r as ScrollAreaScrollbar, t as Corner } from "../_libs/radix-ui__react-scroll-area.mjs";
import { t as Root$1 } from "../_libs/radix-ui__react-label.mjs";
import { t as Root$2 } from "../_libs/radix-ui__react-separator.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-FtP-038R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CJK_SANS_FALLBACK = "\"Apple SD Gothic Neo\", \"Malgun Gothic\", \"Hiragino Sans\", \"Noto Sans KR\", \"Noto Sans JP\", \"Noto Sans SC\", sans-serif";
var CJK_SERIF_FALLBACK = "\"Apple Myungjo\", \"Batang\", \"Hiragino Mincho ProN\", \"Noto Serif KR\", \"Noto Serif JP\", \"Noto Serif SC\", serif";
var MONO_FALLBACK = "ui-monospace, \"SF Mono\", Menlo, Consolas, \"Nanum Gothic Coding\", monospace";
function google(families) {
	return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}
var FONTS = [
	{
		id: "pretendard",
		name: "Pretendard",
		category: "sans",
		scripts: [
			"ko",
			"ja",
			"latin"
		],
		stack: `"Pretendard Variable", Pretendard, ${CJK_SANS_FALLBACK}`,
		href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
	},
	{
		id: "suit",
		name: "SUIT",
		category: "sans",
		scripts: ["ko", "latin"],
		stack: `SUIT, ${CJK_SANS_FALLBACK}`,
		href: "https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css"
	},
	{
		id: "ibm-plex-sans-kr",
		name: "IBM Plex Sans KR",
		category: "sans",
		scripts: ["ko", "latin"],
		stack: `"IBM Plex Sans KR", ${CJK_SANS_FALLBACK}`,
		href: google("family=IBM+Plex+Sans+KR:wght@400;500;600;700")
	},
	{
		id: "noto-sans-kr",
		name: "Noto Sans KR",
		category: "sans",
		scripts: ["ko", "latin"],
		stack: `"Noto Sans KR", ${CJK_SANS_FALLBACK}`,
		href: google("family=Noto+Sans+KR:wght@400;500;600;700")
	},
	{
		id: "noto-sans-jp",
		name: "Noto Sans JP",
		category: "sans",
		scripts: ["ja", "latin"],
		stack: `"Noto Sans JP", ${CJK_SANS_FALLBACK}`,
		href: google("family=Noto+Sans+JP:wght@400;500;600;700")
	},
	{
		id: "noto-sans-sc",
		name: "Noto Sans SC",
		category: "sans",
		scripts: ["zh", "latin"],
		stack: `"Noto Sans SC", ${CJK_SANS_FALLBACK}`,
		href: google("family=Noto+Sans+SC:wght@400;500;600;700")
	},
	{
		id: "noto-sans-tc",
		name: "Noto Sans TC",
		category: "sans",
		scripts: ["zh", "latin"],
		stack: `"Noto Sans TC", ${CJK_SANS_FALLBACK}`,
		href: google("family=Noto+Sans+TC:wght@400;500;600;700")
	},
	{
		id: "gowun-dodum",
		name: "고운돋움",
		category: "sans",
		scripts: ["ko", "latin"],
		stack: `"Gowun Dodum", ${CJK_SANS_FALLBACK}`,
		href: google("family=Gowun+Dodum&display=swap")
	},
	{
		id: "gowun-batang",
		name: "고운바탕",
		category: "serif",
		scripts: ["ko", "latin"],
		stack: `"Gowun Batang", ${CJK_SERIF_FALLBACK}`,
		href: google("family=Gowun+Batang:wght@400;700")
	},
	{
		id: "noto-serif-kr",
		name: "Noto Serif KR",
		category: "serif",
		scripts: ["ko", "latin"],
		stack: `"Noto Serif KR", ${CJK_SERIF_FALLBACK}`,
		href: google("family=Noto+Serif+KR:wght@400;600;700")
	},
	{
		id: "noto-serif-jp",
		name: "Noto Serif JP",
		category: "serif",
		scripts: ["ja", "latin"],
		stack: `"Noto Serif JP", ${CJK_SERIF_FALLBACK}`,
		href: google("family=Noto+Serif+JP:wght@400;600;700")
	},
	{
		id: "noto-serif-sc",
		name: "Noto Serif SC",
		category: "serif",
		scripts: ["zh", "latin"],
		stack: `"Noto Serif SC", ${CJK_SERIF_FALLBACK}`,
		href: google("family=Noto+Serif+SC:wght@400;600;700")
	},
	{
		id: "noto-serif-tc",
		name: "Noto Serif TC",
		category: "serif",
		scripts: ["zh", "latin"],
		stack: `"Noto Serif TC", ${CJK_SERIF_FALLBACK}`,
		href: google("family=Noto+Serif+TC:wght@400;600;700")
	},
	{
		id: "hahmlet",
		name: "Hahmlet",
		category: "serif",
		scripts: ["ko", "latin"],
		stack: `Hahmlet, ${CJK_SERIF_FALLBACK}`,
		href: google("family=Hahmlet:wght@400;500;600;700")
	},
	{
		id: "song-myung",
		name: "송명",
		category: "serif",
		scripts: ["ko", "latin"],
		stack: `"Song Myung", ${CJK_SERIF_FALLBACK}`,
		href: google("family=Song+Myung")
	},
	{
		id: "nanum-myeongjo",
		name: "나눔명조",
		category: "serif",
		scripts: ["ko", "latin"],
		stack: `"Nanum Myeongjo", ${CJK_SERIF_FALLBACK}`,
		href: google("family=Nanum+Myeongjo:wght@400;700")
	},
	{
		id: "shippori-mincho",
		name: "しっぽり明朝",
		category: "serif",
		scripts: ["ja", "latin"],
		stack: `"Shippori Mincho", ${CJK_SERIF_FALLBACK}`,
		href: google("family=Shippori+Mincho:wght@400;500;600;700")
	},
	{
		id: "system-sans",
		name: "시스템 고딕",
		category: "sans",
		scripts: [
			"ko",
			"ja",
			"zh",
			"latin"
		],
		stack: `system-ui, ${CJK_SANS_FALLBACK}`
	},
	{
		id: "system-serif",
		name: "시스템 명조",
		category: "serif",
		scripts: [
			"ko",
			"ja",
			"zh",
			"latin"
		],
		stack: `ui-serif, ${CJK_SERIF_FALLBACK}`
	},
	{
		id: "ibm-plex-mono",
		name: "IBM Plex Mono",
		category: "mono",
		scripts: ["latin"],
		stack: `"IBM Plex Mono", ${MONO_FALLBACK}`,
		href: google("family=IBM+Plex+Mono:wght@400;500;600")
	},
	{
		id: "jetbrains-mono",
		name: "JetBrains Mono",
		category: "mono",
		scripts: ["latin"],
		stack: `"JetBrains Mono", ${MONO_FALLBACK}`,
		href: google("family=JetBrains+Mono:wght@400;500;600")
	},
	{
		id: "nanum-gothic-coding",
		name: "나눔고딕코딩",
		category: "mono",
		scripts: ["ko", "latin"],
		stack: `"Nanum Gothic Coding", ${MONO_FALLBACK}`,
		href: google("family=Nanum+Gothic+Coding:wght@400;700")
	},
	{
		id: "system-mono",
		name: "시스템 모노",
		category: "mono",
		scripts: [
			"ko",
			"ja",
			"zh",
			"latin"
		],
		stack: MONO_FALLBACK
	}
];
var FONT_BY_ID = new Map(FONTS.map((f) => [f.id, f]));
function fontStack(id, fallbackId) {
	return FONT_BY_ID.get(id)?.stack ?? FONT_BY_ID.get(fallbackId)?.stack ?? CJK_SANS_FALLBACK;
}
var BODY_FONTS = FONTS.filter((f) => f.category !== "mono");
var MONO_FONTS = FONTS.filter((f) => f.category === "mono");
var APP_LANGS = [
	{
		id: "ko",
		native: "한국어"
	},
	{
		id: "ja",
		native: "日本語"
	},
	{
		id: "zh-CN",
		native: "简体中文"
	},
	{
		id: "zh-TW",
		native: "繁體中文"
	},
	{
		id: "en",
		native: "English"
	}
];
var ko = {
	edit: "편집",
	split: "분할",
	preview: "보기",
	open: "열기",
	save: "저장",
	sample: "샘플",
	print: "인쇄",
	share: "공유",
	settings: "설정",
	more: "더보기",
	close: "닫기",
	copy: "복사",
	cjkFixed: "보정",
	cjkRaw: "원본",
	openedFile: (name) => `${name} 파일을 열었습니다`,
	sampleLoaded: "샘플 문서를 불러왔습니다",
	settingsTitle: "판면",
	settingsDesc: "글꼴·용지·색은 이 브라우저에 저장됩니다.",
	appSection: "앱",
	appLanguage: "앱 언어",
	appLanguageHint: "메뉴와 설정 문구만 바꿉니다. 본문 언어와는 별개입니다.",
	paper: "용지",
	fonts: "글꼴",
	paragraph: "문단",
	colors: "색",
	engine: "엔진",
	body: "본문",
	heading: "제목",
	code: "코드",
	matchBody: "본문과 같음",
	headingPreview: "제목 미리보기",
	size: "크기",
	lineHeight: "줄간격",
	letterSpacing: "자간",
	contentWidth: "본문 폭",
	paragraphGap: "문단 간격",
	contentLanguage: "본문 언어",
	wordBreak: "줄바꿈",
	wordBreakKeep: "단어 유지 (한국어 권장)",
	wordBreakWord: "긴 단어만 나눔",
	wordBreakNormal: "브라우저 기본",
	cjkLineBreak: "CJK 줄나눔",
	lbAuto: "자동",
	lbLoose: "느슨",
	lbNormal: "보통",
	lbStrict: "엄격",
	lbAnywhere: "어디든",
	hangingPunct: "걸침 구두점",
	hangingPunctHint: "따옴표·괄호를 왼쪽 여백에 살짝 걸칩니다.",
	colorBg: "바탕",
	colorFg: "본문",
	colorHeading: "제목",
	colorMuted: "보조",
	colorLink: "링크",
	colorCodeBg: "코드 바탕",
	cjkEmphasis: "CJK 강조 보정",
	cjkEmphasisHint: "굵게 문법 바로 뒤에 한글·한자·가나가 붙어도 강조가 풀리지 않습니다.",
	softBreaks: "한 줄 개행 유지",
	softBreaksHint: "엔터 한 번을 줄바꿈으로 렌더링합니다.",
	syncScroll: "스크롤 동기화",
	syncScrollHint: "편집기와 미리보기를 같은 비율로 움직입니다.",
	toc: "목차",
	tocHint: "제목으로 미리보기 위치를 점프합니다.",
	resetDefaults: "글꼴·용지 기본값",
	themes: {
		hanji: {
			name: "한지",
			description: "따뜻한 닥종이"
		},
		snow: {
			name: "눈",
			description: "맑은 흰 지면"
		},
		sepia: {
			name: "세피아",
			description: "오래된 책"
		},
		ink: {
			name: "먹",
			description: "깊은 먹물"
		},
		night: {
			name: "밤",
			description: "남색 야간"
		},
		contrast: {
			name: "고대비",
			description: "흑백 대비"
		}
	},
	shareTitle: "공유",
	shareDesc: "글과 판면을 압축해 주소에 담은 뒤, 짧은 링크로 바꿉니다.",
	includePage: "판면 포함",
	includePageHint: "글꼴·색·간격까지 같이 보냅니다.",
	creatingLink: "짧은 링크를 만드는 중…",
	shareTooLong: "글이 너무 길어 링크로 담을 수 없습니다",
	shareFailed: "링크를 만들지 못했습니다",
	copiedShort: "짧은 링크를 복사했습니다",
	copiedEncoded: "원본 인코딩 주소를 복사했습니다",
	copied: "복사했습니다",
	shortLink: "짧은 링크",
	encodedAddress: "인코딩된 주소",
	encodedOriginal: "원본 인코딩 주소",
	fallbackHint: "짧은 링크를 만들지 못해, 내용이 담긴 원본 주소를 썼습니다.",
	shareBroken: "공유 링크가 손상되었습니다",
	shareOpened: "공유된 글을 열었습니다",
	markdownSource: "마크다운 원문",
	copiedCode: "코드를 복사했습니다",
	tocLabel: "목차",
	noHeadings: "제목이 없습니다.",
	linkMissing: "링크를 찾을 수 없습니다",
	linkMissingHint: "만료되었거나 잘못된 주소입니다. 새로 공유하면 다른 짧은 링크가 만들어집니다.",
	backHome: "한지로 돌아가기"
};
var MESSAGES = {
	ko,
	ja: {
		edit: "編集",
		split: "分割",
		preview: "表示",
		open: "開く",
		save: "保存",
		sample: "サンプル",
		print: "印刷",
		share: "共有",
		settings: "設定",
		more: "その他",
		close: "閉じる",
		copy: "コピー",
		cjkFixed: "補正",
		cjkRaw: "原文",
		openedFile: (name) => `${name} を開きました`,
		sampleLoaded: "サンプル文書を読み込みました",
		settingsTitle: "版面",
		settingsDesc: "フォント・用紙・色はこのブラウザに保存されます。",
		appSection: "アプリ",
		appLanguage: "アプリの言語",
		appLanguageHint: "メニューと設定の文言だけが変わります。本文の言語とは別です。",
		paper: "用紙",
		fonts: "フォント",
		paragraph: "段落",
		colors: "色",
		engine: "エンジン",
		body: "本文",
		heading: "見出し",
		code: "コード",
		matchBody: "本文と同じ",
		headingPreview: "見出しプレビュー",
		size: "サイズ",
		lineHeight: "行間",
		letterSpacing: "字間",
		contentWidth: "本文幅",
		paragraphGap: "段落間隔",
		contentLanguage: "本文の言語",
		wordBreak: "改行",
		wordBreakKeep: "単語を維持（日本語向け）",
		wordBreakWord: "長い単語だけ折り返す",
		wordBreakNormal: "ブラウザ標準",
		cjkLineBreak: "CJK 禁則",
		lbAuto: "自動",
		lbLoose: "ゆるめ",
		lbNormal: "標準",
		lbStrict: "厳格",
		lbAnywhere: "どこでも",
		hangingPunct: "ぶら下げ組",
		hangingPunctHint: "引用符や括弧を左余白に少しぶら下げます。",
		colorBg: "地",
		colorFg: "本文",
		colorHeading: "見出し",
		colorMuted: "補助",
		colorLink: "リンク",
		colorCodeBg: "コード地",
		cjkEmphasis: "CJK 強調補正",
		cjkEmphasisHint: "太字の直後に漢字・仮名が続いても強調が解けません。",
		softBreaks: "単一改行を保持",
		softBreaksHint: "Enter 一回を改行として描画します。",
		syncScroll: "スクロール同期",
		syncScrollHint: "編集とプレビューを同じ割合で動かします。",
		toc: "目次",
		tocHint: "見出しからプレビュー位置へジャンプします。",
		resetDefaults: "フォント・用紙を初期化",
		themes: {
			hanji: {
				name: "韓紙",
				description: "あたたかい和紙"
			},
			snow: {
				name: "雪",
				description: "澄んだ白い紙面"
			},
			sepia: {
				name: "セピア",
				description: "古い本"
			},
			ink: {
				name: "墨",
				description: "深い墨色"
			},
			night: {
				name: "夜",
				description: "藍色の夜"
			},
			contrast: {
				name: "高コントラスト",
				description: "白黒の対比"
			}
		},
		shareTitle: "共有",
		shareDesc: "本文と版面を圧縮して URL に入れ、短いリンクにします。",
		includePage: "版面も含める",
		includePageHint: "フォント・色・間隔も一緒に送ります。",
		creatingLink: "短いリンクを作成中…",
		shareTooLong: "文章が長すぎてリンクに入れられません",
		shareFailed: "リンクを作成できませんでした",
		copiedShort: "短いリンクをコピーしました",
		copiedEncoded: "エンコード済みの元のアドレスをコピーしました",
		copied: "コピーしました",
		shortLink: "短いリンク",
		encodedAddress: "エンコード済みアドレス",
		encodedOriginal: "元のエンコードアドレス",
		fallbackHint: "短いリンクを作れなかったため、内容入りの元のアドレスを使いました。",
		shareBroken: "共有リンクが壊れています",
		shareOpened: "共有された文書を開きました",
		markdownSource: "Markdown 原文",
		copiedCode: "コードをコピーしました",
		tocLabel: "目次",
		noHeadings: "見出しがありません。",
		linkMissing: "リンクが見つかりません",
		linkMissingHint: "期限切れか、誤ったアドレスです。新しく共有すると別の短いリンクになります。",
		backHome: "韓紙に戻る"
	},
	"zh-CN": {
		edit: "编辑",
		split: "分栏",
		preview: "预览",
		open: "打开",
		save: "保存",
		sample: "示例",
		print: "打印",
		share: "分享",
		settings: "设置",
		more: "更多",
		close: "关闭",
		copy: "复制",
		cjkFixed: "校正",
		cjkRaw: "原文",
		openedFile: (name) => `已打开 ${name}`,
		sampleLoaded: "已载入示例文档",
		settingsTitle: "版面",
		settingsDesc: "字体、纸张和颜色保存在此浏览器中。",
		appSection: "应用",
		appLanguage: "应用语言",
		appLanguageHint: "只改变菜单和设置文案，与正文语言无关。",
		paper: "纸张",
		fonts: "字体",
		paragraph: "段落",
		colors: "颜色",
		engine: "引擎",
		body: "正文",
		heading: "标题",
		code: "代码",
		matchBody: "与正文相同",
		headingPreview: "标题预览",
		size: "大小",
		lineHeight: "行距",
		letterSpacing: "字距",
		contentWidth: "正文宽度",
		paragraphGap: "段间距",
		contentLanguage: "正文语言",
		wordBreak: "换行",
		wordBreakKeep: "保持词语（中文推荐）",
		wordBreakWord: "仅折行长词",
		wordBreakNormal: "浏览器默认",
		cjkLineBreak: "CJK 断行",
		lbAuto: "自动",
		lbLoose: "宽松",
		lbNormal: "普通",
		lbStrict: "严格",
		lbAnywhere: "任意",
		hangingPunct: "悬挂标点",
		hangingPunctHint: "将引号、括号略微挂到左页边。",
		colorBg: "底色",
		colorFg: "正文",
		colorHeading: "标题",
		colorMuted: "辅助",
		colorLink: "链接",
		colorCodeBg: "代码底色",
		cjkEmphasis: "CJK 强调校正",
		cjkEmphasisHint: "加粗语法后紧跟汉字或假名时，强调也不会断开。",
		softBreaks: "保留单次换行",
		softBreaksHint: "按一次回车即渲染为换行。",
		syncScroll: "同步滚动",
		syncScrollHint: "编辑区和预览按相同比例滚动。",
		toc: "目录",
		tocHint: "通过标题跳到预览位置。",
		resetDefaults: "恢复字体与纸张默认值",
		themes: {
			hanji: {
				name: "韩纸",
				description: "温润的皮纸"
			},
			snow: {
				name: "雪",
				description: "清亮白纸"
			},
			sepia: {
				name: "褐彩",
				description: "旧书"
			},
			ink: {
				name: "墨",
				description: "深墨"
			},
			night: {
				name: "夜",
				description: "靛蓝夜间"
			},
			contrast: {
				name: "高对比",
				description: "黑白对比"
			}
		},
		shareTitle: "分享",
		shareDesc: "将正文和版面压缩进网址，再换成短链接。",
		includePage: "包含版面",
		includePageHint: "连同字体、颜色和间距一起发送。",
		creatingLink: "正在生成短链接…",
		shareTooLong: "文章过长，无法放入链接",
		shareFailed: "无法创建链接",
		copiedShort: "已复制短链接",
		copiedEncoded: "已复制编码后的原地址",
		copied: "已复制",
		shortLink: "短链接",
		encodedAddress: "编码地址",
		encodedOriginal: "原始编码地址",
		fallbackHint: "未能生成短链接，已改用包含内容的原地址。",
		shareBroken: "分享链接已损坏",
		shareOpened: "已打开分享的文章",
		markdownSource: "Markdown 原文",
		copiedCode: "已复制代码",
		tocLabel: "目录",
		noHeadings: "没有标题。",
		linkMissing: "找不到链接",
		linkMissingHint: "链接已过期或地址有误。重新分享会生成新的短链接。",
		backHome: "返回韩纸"
	},
	"zh-TW": {
		edit: "編輯",
		split: "分割",
		preview: "預覽",
		open: "開啟",
		save: "儲存",
		sample: "範例",
		print: "列印",
		share: "分享",
		settings: "設定",
		more: "更多",
		close: "關閉",
		copy: "複製",
		cjkFixed: "校正",
		cjkRaw: "原文",
		openedFile: (name) => `已開啟 ${name}`,
		sampleLoaded: "已載入範例文件",
		settingsTitle: "版面",
		settingsDesc: "字型、用紙與顏色會儲存在此瀏覽器。",
		appSection: "應用程式",
		appLanguage: "介面語言",
		appLanguageHint: "只改變選單與設定文案，與正文語言無關。",
		paper: "用紙",
		fonts: "字型",
		paragraph: "段落",
		colors: "色彩",
		engine: "引擎",
		body: "正文",
		heading: "標題",
		code: "程式碼",
		matchBody: "與正文相同",
		headingPreview: "標題預覽",
		size: "大小",
		lineHeight: "行距",
		letterSpacing: "字距",
		contentWidth: "正文寬度",
		paragraphGap: "段距",
		contentLanguage: "正文語言",
		wordBreak: "換行",
		wordBreakKeep: "保留詞彙（中文建議）",
		wordBreakWord: "只折行長詞",
		wordBreakNormal: "瀏覽器預設",
		cjkLineBreak: "CJK 斷行",
		lbAuto: "自動",
		lbLoose: "寬鬆",
		lbNormal: "一般",
		lbStrict: "嚴格",
		lbAnywhere: "任意",
		hangingPunct: "懸掛標點",
		hangingPunctHint: "將引號、括號略微掛到左邊界。",
		colorBg: "底色",
		colorFg: "正文",
		colorHeading: "標題",
		colorMuted: "輔助",
		colorLink: "連結",
		colorCodeBg: "程式碼底色",
		cjkEmphasis: "CJK 強調校正",
		cjkEmphasisHint: "粗體語法後緊接漢字或假名時，強調也不會中斷。",
		softBreaks: "保留單次換行",
		softBreaksHint: "按一次 Enter 即渲染為換行。",
		syncScroll: "同步捲動",
		syncScrollHint: "編輯區與預覽依相同比例捲動。",
		toc: "目錄",
		tocHint: "透過標題跳到預覽位置。",
		resetDefaults: "還原字型與用紙預設值",
		themes: {
			hanji: {
				name: "韓紙",
				description: "溫潤的皮紙"
			},
			snow: {
				name: "雪",
				description: "清亮白紙"
			},
			sepia: {
				name: "褐彩",
				description: "舊書"
			},
			ink: {
				name: "墨",
				description: "深墨"
			},
			night: {
				name: "夜",
				description: "靛藍夜間"
			},
			contrast: {
				name: "高對比",
				description: "黑白對比"
			}
		},
		shareTitle: "分享",
		shareDesc: "將正文與版面壓縮進網址，再換成短網址。",
		includePage: "包含版面",
		includePageHint: "連同字型、色彩與間距一起傳送。",
		creatingLink: "正在產生短網址…",
		shareTooLong: "文章過長，無法放入連結",
		shareFailed: "無法建立連結",
		copiedShort: "已複製短網址",
		copiedEncoded: "已複製編碼後的原網址",
		copied: "已複製",
		shortLink: "短網址",
		encodedAddress: "編碼網址",
		encodedOriginal: "原始編碼網址",
		fallbackHint: "未能產生短網址，已改用含內容的原網址。",
		shareBroken: "分享連結已損毀",
		shareOpened: "已開啟分享的文章",
		markdownSource: "Markdown 原文",
		copiedCode: "已複製程式碼",
		tocLabel: "目錄",
		noHeadings: "沒有標題。",
		linkMissing: "找不到連結",
		linkMissingHint: "連結已過期或網址有誤。重新分享會產生新的短網址。",
		backHome: "返回韓紙"
	},
	en: {
		edit: "Edit",
		split: "Split",
		preview: "Preview",
		open: "Open",
		save: "Save",
		sample: "Sample",
		print: "Print",
		share: "Share",
		settings: "Settings",
		more: "More",
		close: "Close",
		copy: "Copy",
		cjkFixed: "fixed",
		cjkRaw: "raw",
		openedFile: (name) => `Opened ${name}`,
		sampleLoaded: "Sample document loaded",
		settingsTitle: "Page",
		settingsDesc: "Fonts, paper, and colors are saved in this browser.",
		appSection: "App",
		appLanguage: "App language",
		appLanguageHint: "Changes menus and settings copy only. Separate from the document language.",
		paper: "Paper",
		fonts: "Fonts",
		paragraph: "Paragraph",
		colors: "Color",
		engine: "Engine",
		body: "Body",
		heading: "Heading",
		code: "Code",
		matchBody: "Same as body",
		headingPreview: "Heading preview",
		size: "Size",
		lineHeight: "Line height",
		letterSpacing: "Tracking",
		contentWidth: "Measure",
		paragraphGap: "Paragraph gap",
		contentLanguage: "Document language",
		wordBreak: "Word break",
		wordBreakKeep: "Keep words (recommended for CJK)",
		wordBreakWord: "Break long words only",
		wordBreakNormal: "Browser default",
		cjkLineBreak: "CJK line break",
		lbAuto: "Auto",
		lbLoose: "Loose",
		lbNormal: "Normal",
		lbStrict: "Strict",
		lbAnywhere: "Anywhere",
		hangingPunct: "Hanging punctuation",
		hangingPunctHint: "Lets quotes and brackets hang into the left margin.",
		colorBg: "Background",
		colorFg: "Text",
		colorHeading: "Heading",
		colorMuted: "Muted",
		colorLink: "Link",
		colorCodeBg: "Code background",
		cjkEmphasis: "CJK emphasis fix",
		cjkEmphasisHint: "Bold stays bold when Hangul, kanji, or kana follow immediately.",
		softBreaks: "Keep single line breaks",
		softBreaksHint: "Render a single Enter as a line break.",
		syncScroll: "Sync scroll",
		syncScrollHint: "Move the editor and preview by the same ratio.",
		toc: "Contents",
		tocHint: "Jump the preview to a heading.",
		resetDefaults: "Reset fonts and paper",
		themes: {
			hanji: {
				name: "Hanji",
				description: "Warm mulberry paper"
			},
			snow: {
				name: "Snow",
				description: "Clear white sheet"
			},
			sepia: {
				name: "Sepia",
				description: "Old book"
			},
			ink: {
				name: "Ink",
				description: "Deep sumi"
			},
			night: {
				name: "Night",
				description: "Indigo evening"
			},
			contrast: {
				name: "Contrast",
				description: "Black and white"
			}
		},
		shareTitle: "Share",
		shareDesc: "The document and page are packed into the URL, then shortened.",
		includePage: "Include page",
		includePageHint: "Send fonts, colors, and spacing too.",
		creatingLink: "Creating a short link…",
		shareTooLong: "This document is too long to fit in a link",
		shareFailed: "Could not create a link",
		copiedShort: "Short link copied",
		copiedEncoded: "Encoded URL copied",
		copied: "Copied",
		shortLink: "Short link",
		encodedAddress: "Encoded URL",
		encodedOriginal: "Original encoded URL",
		fallbackHint: "A short link could not be created, so the encoded URL was used instead.",
		shareBroken: "This share link is damaged",
		shareOpened: "Opened the shared document",
		markdownSource: "Markdown source",
		copiedCode: "Code copied",
		tocLabel: "Contents",
		noHeadings: "No headings.",
		linkMissing: "Link not found",
		linkMissingHint: "This address is expired or invalid. Sharing again creates a new short link.",
		backHome: "Back to Hanji"
	}
};
function isAppLang(value) {
	return value === "ko" || value === "ja" || value === "zh-CN" || value === "zh-TW" || value === "en";
}
function messages(lang) {
	return isAppLang(lang) ? MESSAGES[lang] : ko;
}
var SAMPLE_DOCUMENT = `# 한지

CJK에 정직한 마크다운 뷰어입니다. CommonMark는 \`**강조**\` 바로 안쪽이 구두점·괄호이고 바깥이 공백이 아니면 굵게 처리를 포기합니다. 한지는 이 규칙을 고칩니다.

> 아래 문장들은 보정 없이는 별표가 그대로 남는 대표 사례입니다. 설정에서 **CJK 강조 보정**을 끄면 차이를 바로 볼 수 있습니다.

## 한국어

- 조사 부착: **JWT(JSON Web Token)**는 인증에 쓰입니다.
- 마침표 직후: **중요한 결정.**바로 이어서 본문이 옵니다.
- 괄호 설명: **이 용어（읽기）**에 대해 설명합니다.
- 닫는 괄호: **별표는 강조로 인식되지 않습니다(이 괄호 때문에)**이 문장 때문에.
- 단어 한가운데: 이것은**중요**합니다.
- 이탤릭: *강조 표시*입니다만 조사와 붙습니다.
- 취소선: ~~초안입니다。~~다음 문장과 이어집니다.

짧은 본문 예. **한지(韓紙)**는 닥나무를 떠서 만든 종이입니다. 먹이 스며드는 결이 있어서, 화면에서도 그 온도를 살리려 했습니다.

## 日本語

- 句点の直後: **このアスタリスクは強調記号として認識されず、そのまま表示されます。**この文のせいで。
- 括弧を含む語: **この用語（読み方など）**について説明します。
- かぎ括弧: **「引用」**は本文に続きます。

春の**和紙。**隣に置くと、墨色が落ち着きます。

## 中文

- 句号紧贴: **该星号不会被识别，而是直接显示。**这是因为它没有被识别为强调符号。
- 括号注解: **该术语（读音）**用于说明。

宣纸上的**墨迹。**随后是正文。

## GFM 요소

할 일

- [x] CJK 강조·취소선
- [ ] 각주와 수식
- [ ] 표와 코드

표

| 언어 | 문장 | 기대 |
| --- | --- | --- |
| 한국어 | **토큰)**는 | 굵게 + 조사 |
| 日本語 | **太字。**です | 굵게 + です |
| 中文 | **重点。**然后 | 굵게 + 然后 |

수식은 인라인 $E = mc^2$ 과 디스플레이를 지원합니다.

$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$

코드 펜스 (한글 식별자도 깨지지 않게 모노 글꼴을 고를 수 있습니다).

\`\`\`typescript
const 인사 = (이름: string) => \`안녕, \${이름}\`;
console.log(인사("한지"));
\`\`\`

다이어그램

\`\`\`mermaid
flowchart LR
  A[원문] --> B[CJK 보정]
  B --> C[한지 미리보기]
  C --> D[글꼴 / 용지]
\`\`\`

인용과 각주. 한지는 화면용 종이입니다.[^paper]

\`\`\`
**보정 전**에는 별표가 남고
**보정 후**에는 굵게 붙습니다.
\`\`\`

링크: [CommonMark #650](https://github.com/commonmark/commonmark-spec/issues/650) 이 이 문제의 출발점입니다.

---

글꼴·크기·줄간격·색·용지는 오른쪽 설정에서 이 브라우저에만 저장됩니다. 파일을 열어 쓰거나, 이 샘플을 지우고 붙여 넣으면 됩니다.

[^paper]: 한지(韓紙). 닥나무 섬유로 뜬 한국의 전통 종이.
`;
var THEME_PRESETS = [
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
			heading: "#1c1917"
		}
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
			heading: "#111110"
		}
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
			heading: "#2c1e12"
		}
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
			heading: "#f4efe6"
		}
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
			heading: "#f0f2f5"
		}
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
			heading: "#ffffff"
		}
	}
];
var THEME_BY_ID = new Map(THEME_PRESETS.map((t) => [t.id, t]));
var DEFAULT_THEME = THEME_PRESETS[0];
var defaultSettings = {
	preset: DEFAULT_THEME.id,
	colors: { ...DEFAULT_THEME.colors },
	bodyFont: "gowun-batang",
	headingFont: "match-body",
	monoFont: "nanum-gothic-coding",
	fontSize: 17,
	lineHeight: 1.85,
	letterSpacing: 0,
	paragraphSpacing: .9,
	maxWidth: 44,
	wordBreak: "keep-all",
	lineBreak: "strict",
	hangingPunctuation: true,
	cjkFriendly: true,
	softBreaks: false,
	syncScroll: true,
	showToc: false,
	viewMode: "split",
	contentLang: "ko",
	uiLang: "ko"
};
var useSettings = create()(persist((set) => ({
	...defaultSettings,
	applyPreset: (id) => {
		const preset = THEME_BY_ID.get(id);
		if (!preset) return;
		set({
			preset: id,
			colors: { ...preset.colors }
		});
	},
	setColors: (patch) => set((state) => ({ colors: {
		...state.colors,
		...patch
	} })),
	set: (patch) => set(patch),
	reset: () => set((state) => ({
		...defaultSettings,
		colors: { ...DEFAULT_THEME.colors },
		uiLang: state.uiLang
	}))
}), {
	name: "hanji-settings",
	skipHydration: true,
	version: 2,
	migrate: (persisted) => {
		const state = { ...persisted };
		if (!isAppLang(state.uiLang)) state.uiLang = "ko";
		return state;
	}
}));
var useDocument = create()(persist((set) => ({
	markdown: SAMPLE_DOCUMENT,
	fileName: "한지.md",
	setMarkdown: (markdown) => set({ markdown }),
	setFileName: (fileName) => set({ fileName }),
	loadSample: () => set({
		markdown: SAMPLE_DOCUMENT,
		fileName: "한지.md"
	})
}), {
	name: "hanji-document",
	skipHydration: true,
	version: 1
}));
function headingFontId(settings) {
	return settings.headingFont === "match-body" ? settings.bodyFont : settings.headingFont;
}
function FontLoader() {
	const bodyFont = useSettings((s) => s.bodyFont);
	const headingFont = useSettings((s) => s.headingFont);
	const monoFont = useSettings((s) => s.monoFont);
	(0, import_react.useEffect)(() => {
		const ids = [
			bodyFont,
			headingFontId({
				bodyFont,
				headingFont
			}),
			monoFont
		];
		for (const id of ids) {
			const href = FONT_BY_ID.get(id)?.href;
			if (!href) continue;
			if (document.querySelector(`link[data-hanji-font="${CSS.escape(href)}"]`)) continue;
			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = href;
			link.dataset.hanjiFont = href;
			document.head.appendChild(link);
		}
	}, [
		bodyFont,
		headingFont,
		monoFont
	]);
	return null;
}
function MarkdownEditor({ scrollRef }) {
	const markdown = useDocument((s) => s.markdown);
	const setMarkdown = useDocument((s) => s.setMarkdown);
	const contentLang = useSettings((s) => s.contentLang);
	const t = messages(useSettings((s) => s.uiLang));
	const onKeyDown = (0, import_react.useCallback)((event) => {
		if (event.nativeEvent.isComposing || event.key === "Process") return;
		if (event.key !== "Tab") return;
		event.preventDefault();
		const el = event.currentTarget;
		const start = el.selectionStart;
		const end = el.selectionEnd;
		const next = `${markdown.slice(0, start)}  ${markdown.slice(end)}`;
		setMarkdown(next);
		requestAnimationFrame(() => {
			el.selectionStart = el.selectionEnd = start + 2;
		});
	}, [markdown, setMarkdown]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		ref: scrollRef,
		className: "md-editor",
		value: markdown,
		spellCheck: false,
		autoCapitalize: "off",
		autoCorrect: "off",
		lang: contentLang,
		"aria-label": t.markdownSource,
		onChange: (event) => setMarkdown(event.target.value),
		onKeyDown
	});
}
var cache = null;
function slugify(value) {
	return value.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\p{L}\p{N}\p{M}-]+/gu, "").replace(/-+/g, "-").replace(/^-|-$/g, "") || "section";
}
function escapeHtml(text) {
	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function highlight(code, lang) {
	const key = lang.trim().toLowerCase();
	if (!key) return escapeHtml(code);
	try {
		if (es_default.getLanguage(key)) return es_default.highlight(code, {
			language: key,
			ignoreIllegals: true
		}).value;
	} catch {}
	return escapeHtml(code);
}
function mathBlockPlugin(md) {
	md.block.ruler.before("fence", "math_block", (state, start, end, silent) => {
		if (state.getLines(start, start + 1, 0, false).trim() !== "$$") return false;
		let next = start + 1;
		while (next < end) {
			if (state.getLines(next, next + 1, 0, false).trim() === "$$") break;
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
	});
	md.renderer.rules.math_block = (tokens, idx) => {
		const tex = tokens[idx]?.content ?? "";
		try {
			return `<div class="md-math md-math-block">${katex.renderToString(tex, {
				displayMode: true,
				throwOnError: false,
				output: "html"
			})}</div>\n`;
		} catch {
			return `<pre class="md-math-error">${md.utils.escapeHtml(tex)}</pre>\n`;
		}
	};
}
function mathInlinePlugin(md) {
	md.inline.ruler.after("escape", "math_inline", (state, silent) => {
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
	md.renderer.rules.math_inline = (tokens, idx) => {
		const tex = tokens[idx]?.content ?? "";
		try {
			return katex.renderToString(tex, {
				displayMode: false,
				throwOnError: false,
				output: "html"
			});
		} catch {
			return `<code>${md.utils.escapeHtml(tex)}</code>`;
		}
	};
}
function strikethroughPlugin(md) {
	md.inline.ruler.after("emphasis", "strikethrough", (state, silent) => {
		const start = state.pos;
		if (state.src.charCodeAt(start) !== 126 || state.src.charCodeAt(start + 1) !== 126) return false;
		if (state.src.charCodeAt(start + 2) === 126) return false;
		let pos = start + 2;
		let found = -1;
		while (pos < state.posMax - 1) {
			if (state.src.charCodeAt(pos) === 92) {
				pos += 2;
				continue;
			}
			if (state.src.charCodeAt(pos) === 126 && state.src.charCodeAt(pos + 1) === 126) {
				if (state.src.charCodeAt(pos + 2) === 126) {
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
function taskListPlugin(md) {
	md.core.ruler.after("inline", "task-lists", (state) => {
		let index = 0;
		const tokens = state.tokens;
		for (let i = 2; i < tokens.length; i++) {
			const inline = tokens[i];
			const paragraph = tokens[i - 1];
			const item = tokens[i - 2];
			if (inline?.type !== "inline" || paragraph?.type !== "paragraph_open" || item?.type !== "list_item_open") continue;
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
function collectHeadings(tokens) {
	const headings = [];
	const used = /* @__PURE__ */ new Map();
	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		if (token?.type !== "heading_open") continue;
		const level = Number(token.tag.slice(1));
		const text = tokens[i + 1]?.children?.filter((child) => child.type === "text" || child.type === "code_inline").map((child) => String(child.content)).join("") ?? "";
		let id = String(token.attrGet("id") ?? slugify(text));
		const seen = used.get(id) ?? 0;
		if (seen > 0) id = `${id}-${seen + 1}`;
		used.set(String(token.attrGet("id") ?? slugify(text)), seen + 1);
		headings.push({
			id,
			level,
			text
		});
	}
	return headings;
}
function createParser(options) {
	const md = new MarkdownItCallable({
		html: false,
		linkify: true,
		typographer: false,
		breaks: options.softBreaks,
		highlight: (code, lang) => {
			if (lang.trim().toLowerCase() === "mermaid") return escapeHtml(code);
			return highlight(code, lang);
		}
	});
	if (options.cjkFriendly) md.use(markdownItCjkFriendlyPlugin);
	md.use(b, {
		slugify,
		permalink: b.permalink.linkInsideHeader({
			symbol: "#",
			placement: "after",
			ariaHidden: true,
			class: "md-anchor"
		}),
		tabIndex: false
	});
	md.use(footnote_plugin);
	md.use(strikethroughPlugin);
	md.use(taskListPlugin);
	md.use(mathBlockPlugin);
	md.use(mathInlinePlugin);
	const fallbackRender = (tokens, idx, opts, env, self) => self.renderToken(tokens, idx, opts);
	const defaultFence = md.renderer.rules.fence ?? fallbackRender;
	md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
		const token = tokens[idx];
		if (!token) return "";
		const lang = token.info.trim().split(/\s+/)[0] ?? "";
		if (lang.toLowerCase() === "mermaid") return `<pre class="md-mermaid"><code class="language-mermaid">${md.utils.escapeHtml(token.content)}</code></pre>\n`;
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
	md.renderer.rules.table_open = (tokens, idx, opts, env, self) => `<div class="md-table-wrap">${defaultTableOpen(tokens, idx, opts, env, self)}`;
	const defaultTableClose = md.renderer.rules.table_close ?? fallbackRender;
	md.renderer.rules.table_close = (tokens, idx, opts, env, self) => `${defaultTableClose(tokens, idx, opts, env, self)}</div>`;
	return md;
}
function getParser(options) {
	const key = `${options.cjkFriendly ? 1 : 0}:${options.softBreaks ? 1 : 0}`;
	if (cache?.key === key) return cache.md;
	const md = createParser(options);
	cache = {
		key,
		md
	};
	return md;
}
function renderMarkdown(source, options) {
	const md = getParser(options);
	const env = {};
	const tokens = md.parse(source, env);
	return {
		html: md.renderer.render(tokens, md.options, env),
		headings: collectHeadings(tokens)
	};
}
function toggleTaskAt(source, index) {
	const pattern = /^(\s*(?:[-*+]|\d+[.)])\s+)\[([ xX])\]/gm;
	let current = 0;
	return source.replace(pattern, (full, prefix, mark) => {
		if (current++ !== index) return full;
		return `${prefix}[${mark === " " ? "x" : " "}]`;
	});
}
function containsMermaid(html) {
	return html.includes("language-mermaid");
}
function MarkdownPreview({ scrollRef, dark }) {
	const markdown = useDocument((s) => s.markdown);
	const setMarkdown = useDocument((s) => s.setMarkdown);
	const settings = useSettings();
	const bodyRef = (0, import_react.useRef)(null);
	const html = (0, import_react.useMemo)(() => renderMarkdown(markdown, {
		cjkFriendly: settings.cjkFriendly,
		softBreaks: settings.softBreaks
	}), [
		markdown,
		settings.cjkFriendly,
		settings.softBreaks
	]).html;
	(0, import_react.useEffect)(() => {
		const root = bodyRef.current;
		if (!root || !containsMermaid(html)) return;
		let cancelled = false;
		const nodes = [...root.querySelectorAll(".language-mermaid")];
		if (nodes.length === 0) return;
		import("../_libs/mermaid+[...].mjs").then((n) => n.t).then(async ({ default: mermaid }) => {
			if (cancelled) return;
			mermaid.initialize({
				startOnLoad: false,
				theme: dark ? "dark" : "neutral",
				securityLevel: "strict",
				fontFamily: "inherit"
			});
			for (const node of nodes) {
				const pre = node.closest("pre");
				const source = node.textContent ?? "";
				const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
				try {
					const { svg } = await mermaid.render(id, source);
					if (cancelled) return;
					const wrap = document.createElement("div");
					wrap.className = "md-mermaid";
					wrap.innerHTML = svg;
					pre?.replaceWith(wrap);
				} catch {}
			}
		});
		return () => {
			cancelled = true;
		};
	}, [html, dark]);
	const headingStack = fontStack(headingFontId(settings), settings.bodyFont);
	const bodyStack = fontStack(settings.bodyFont, "gowun-batang");
	const monoStack = fontStack(settings.monoFont, "system-mono");
	const onClick = (event) => {
		const target = event.target;
		const copyBtn = target.closest("[data-copy]");
		if (copyBtn) {
			const code = copyBtn.closest(".md-code")?.querySelector("pre")?.textContent ?? "";
			navigator.clipboard.writeText(code).then(() => toast(messages(useSettings.getState().uiLang).copiedCode));
			return;
		}
		const checkbox = target.closest("input[data-task-index]");
		if (checkbox) {
			event.preventDefault();
			const index = Number(checkbox.dataset.taskIndex);
			if (Number.isFinite(index)) setMarkdown(toggleTaskAt(markdown, index));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: scrollRef,
		className: "md-preview-scroll",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "md-preview",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
				ref: bodyRef,
				lang: settings.contentLang,
				className: "md-body",
				style: {
					"--md-bg": settings.colors.bg,
					"--md-fg": settings.colors.fg,
					"--md-muted": settings.colors.muted,
					"--md-heading": settings.colors.heading,
					"--md-link": settings.colors.link,
					"--md-code-bg": settings.colors.codeBg,
					"--md-font": bodyStack,
					"--md-heading-font": headingStack,
					"--md-mono": monoStack,
					"--md-size": `${settings.fontSize}px`,
					"--md-leading": String(settings.lineHeight),
					"--md-tracking": `${settings.letterSpacing}em`,
					"--md-para-gap": `${settings.paragraphSpacing}em`,
					"--md-width": `${settings.maxWidth}rem`,
					"--md-word-break": settings.wordBreak,
					"--md-line-break": settings.lineBreak,
					"--md-hang": settings.hangingPunctuation ? "first last allow-end" : "none"
				},
				dangerouslySetInnerHTML: { __html: html },
				onClick
			})
		})
	});
}
function ScrollArea({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
		className: cn("relative overflow-hidden", className),
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
				className: "size-full rounded-[inherit]",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, {})
		]
	});
}
function ScrollBar({ className, orientation = "vertical", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
		orientation,
		className: cn("flex touch-none select-none p-px transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
	});
}
function TableOfContents({ headings, onJump }) {
	const t = messages(useSettings((s) => s.uiLang));
	const items = headings.filter((item) => item.level <= 3);
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-4 py-3 text-sm text-muted-foreground",
		children: t.noHeadings
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "md-toc px-3 py-3",
			"aria-label": t.tocLabel,
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `#${item.id}`,
				className: cn(item.level === 1 && "font-medium text-foreground", item.level > 2 && "opacity-80"),
				style: { paddingLeft: `${(item.level - 1) * .75}rem` },
				onClick: (event) => {
					event.preventDefault();
					onJump(item.id);
				},
				children: item.text || item.id
			}, item.id))
		})
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
			outline: "bg-transparent shadow-[var(--shadow-border)] hover:bg-accent",
			destructive: "bg-destructive text-white hover:opacity-90"
		},
		size: {
			default: "h-10 px-3.5",
			sm: "h-9 px-2.5 text-xs",
			icon: "size-10",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function DropdownMenu({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, { ...props });
}
function DropdownMenuTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, { ...props });
}
function DropdownMenuContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset,
		className: cn("z-50 min-w-44 overflow-hidden rounded-xl bg-popover p-1 text-popover-foreground shadow-[var(--shadow-border)]", className),
		...props
	}) });
}
function DropdownMenuItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		className: cn("flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
		...props
	});
}
function Sheet({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, { ...props });
}
function SheetTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, { ...props });
}
function SheetPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, { ...props });
}
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-foreground/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", closeLabel = "닫기", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-[var(--ease-smooth-out)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-150 data-[state=open]:duration-250", side === "right" && "inset-y-0 right-0 h-full w-full border-l border-border sm:max-w-md data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", side === "left" && "inset-y-0 left-0 h-full w-full border-r border-border sm:max-w-md data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: closeLabel
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 px-6 pt-6 pr-14", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("text-lg font-medium tracking-tight", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function parseHex(hex) {
	const m = hex.trim().match(/^#?([0-9a-f]{6})$/i);
	if (!m?.[1]) return null;
	const n = parseInt(m[1], 16);
	return {
		r: n >> 16 & 255,
		g: n >> 8 & 255,
		b: n & 255
	};
}
function normalizeHex(hex, fallback) {
	const c = parseHex(hex);
	if (!c) return fallback;
	return `#${[
		c.r,
		c.g,
		c.b
	].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
function luminance(hex) {
	const c = parseHex(hex);
	if (!c) return 1;
	const lin = (v) => {
		const s = v / 255;
		return s <= .03928 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4;
	};
	return .2126 * lin(c.r) + .7152 * lin(c.g) + .0722 * lin(c.b);
}
function isDarkHex(hex) {
	return luminance(hex) < .45;
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-10 w-full rounded-md bg-background px-3 text-sm shadow-[var(--shadow-border)] outline-none transition-[box-shadow] placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
		className: cn("text-sm font-medium leading-none text-foreground", className),
		...props
	});
}
function Separator$1({ className, orientation = "horizontal", decorative = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$2, {
		decorative,
		orientation,
		className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
		...props
	});
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex w-full touch-none select-none items-center", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-input",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full bg-background shadow-[var(--shadow-border)] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-50" })]
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-[var(--shadow-border)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-background shadow-sm transition-transform data-[state=checked]:translate-x-[18px]" })
	});
}
function Field({ label, value, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "text-muted-foreground",
				children: label
			}), value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs tabular-nums text-muted-foreground",
				children: value
			}) : null]
		}), children]
	});
}
function NativeSelect({ value, onChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		value,
		onChange: (event) => onChange(event.target.value),
		className: "h-10 w-full rounded-md bg-background px-3 text-sm shadow-[var(--shadow-border)] outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
		children
	});
}
function ColorField({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "color",
				value: normalizeHex(value, "#000000"),
				onChange: (event) => onChange(event.target.value),
				className: "size-8 cursor-pointer rounded-md border-0 bg-transparent p-0",
				"aria-label": label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value,
				onChange: (event) => onChange(normalizeHex(event.target.value, value)),
				className: "h-9 w-[6.5rem] font-mono text-xs"
			})]
		})]
	});
}
function SettingsPanel() {
	const settings = useSettings();
	const t = messages(settings.uiLang);
	const headingId = headingFontId(settings);
	const previewStack = fontStack(settings.bodyFont, "gowun-batang");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
		className: "min-h-0 flex-1",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-8 px-6 pb-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: t.appSection
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t.appLanguage,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								value: settings.uiLang,
								onChange: (value) => {
									if (isAppLang(value)) settings.set({ uiLang: value });
								},
								children: APP_LANGS.map((lang) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: lang.id,
									children: lang.native
								}, lang.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: t.appLanguageHint
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: t.paper
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2",
						children: THEME_PRESETS.map((theme) => {
							const active = settings.preset === theme.id;
							const copy = t.themes[theme.id] ?? {
								name: theme.name,
								description: theme.description
							};
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => settings.applyPreset(theme.id),
								className: cn("flex h-16 flex-col items-start justify-between rounded-xl px-3 py-2 text-left shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150", active && "ring-2 ring-ring/70"),
								style: {
									background: theme.colors.bg,
									color: theme.colors.fg
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: copy.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs opacity-70",
									children: copy.description
								})]
							}, theme.id);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: t.fonts
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t.body,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								value: settings.bodyFont,
								onChange: (id) => settings.set({ bodyFont: id }),
								children: BODY_FONTS.map((font) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: font.id,
									children: font.name
								}, font.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t.heading,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
								value: settings.headingFont,
								onChange: (id) => settings.set({ headingFont: id }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "match-body",
									children: t.matchBody
								}), BODY_FONTS.map((font) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: font.id,
									children: font.name
								}, font.id))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t.code,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								value: settings.monoFont,
								onChange: (id) => settings.set({ monoFont: id }),
								children: MONO_FONTS.map((font) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: font.id,
									children: font.name
								}, font.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "rounded-xl bg-muted px-3 py-3 text-base leading-relaxed",
							style: { fontFamily: previewStack },
							children: [FONT_BY_ID.get(settings.bodyFont)?.name, " · 가나다라 ABCabc あいう 漢字"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							style: { fontFamily: fontStack(headingId, "gowun-batang") },
							children: [
								t.headingPreview,
								" · ",
								FONT_BY_ID.get(headingId)?.name
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t.size,
							value: `${settings.fontSize}px`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 14,
								max: 24,
								step: 1,
								value: [settings.fontSize],
								onValueChange: ([value]) => settings.set({ fontSize: value ?? 17 })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t.lineHeight,
							value: settings.lineHeight.toFixed(2),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 1.4,
								max: 2.2,
								step: .05,
								value: [settings.lineHeight],
								onValueChange: ([value]) => settings.set({ lineHeight: value ?? 1.85 })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t.letterSpacing,
							value: `${settings.letterSpacing.toFixed(3)}em`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: -.04,
								max: .08,
								step: .005,
								value: [settings.letterSpacing],
								onValueChange: ([value]) => settings.set({ letterSpacing: value ?? 0 })
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: t.paragraph
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t.contentWidth,
							value: `${settings.maxWidth}rem`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 32,
								max: 64,
								step: 1,
								value: [settings.maxWidth],
								onValueChange: ([value]) => settings.set({ maxWidth: value ?? 44 })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t.paragraphGap,
							value: `${settings.paragraphSpacing.toFixed(2)}em`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: .4,
								max: 1.6,
								step: .05,
								value: [settings.paragraphSpacing],
								onValueChange: ([value]) => settings.set({ paragraphSpacing: value ?? .9 })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t.contentLanguage,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								value: settings.contentLang,
								onChange: (value) => settings.set({ contentLang: value }),
								children: APP_LANGS.map((lang) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: lang.id,
									children: lang.native
								}, lang.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t.wordBreak,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
								value: settings.wordBreak,
								onChange: (value) => settings.set({ wordBreak: value }),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "keep-all",
										children: t.wordBreakKeep
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "break-word",
										children: t.wordBreakWord
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "normal",
										children: t.wordBreakNormal
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t.cjkLineBreak,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
								value: settings.lineBreak,
								onChange: (value) => settings.set({ lineBreak: value }),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "auto",
										children: t.lbAuto
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "loose",
										children: t.lbLoose
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "normal",
										children: t.lbNormal
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "strict",
										children: t.lbStrict
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "anywhere",
										children: t.lbAnywhere
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t.hangingPunct }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: t.hangingPunctHint
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: settings.hangingPunctuation,
								onCheckedChange: (checked) => settings.set({ hangingPunctuation: checked })
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: t.colors
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							label: t.colorBg,
							value: settings.colors.bg,
							onChange: (bg) => settings.setColors({ bg })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							label: t.colorFg,
							value: settings.colors.fg,
							onChange: (fg) => settings.setColors({ fg })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							label: t.colorHeading,
							value: settings.colors.heading,
							onChange: (heading) => settings.setColors({ heading })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							label: t.colorMuted,
							value: settings.colors.muted,
							onChange: (muted) => settings.setColors({ muted })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							label: t.colorLink,
							value: settings.colors.link,
							onChange: (link) => settings.setColors({ link })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							label: t.colorCodeBg,
							value: settings.colors.codeBg,
							onChange: (codeBg) => settings.setColors({ codeBg })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: t.engine
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1 pr-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t.cjkEmphasis }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: t.cjkEmphasisHint
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: settings.cjkFriendly,
								onCheckedChange: (checked) => settings.set({ cjkFriendly: checked })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1 pr-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t.softBreaks }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: t.softBreaksHint
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: settings.softBreaks,
								onCheckedChange: (checked) => settings.set({ softBreaks: checked })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1 pr-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t.syncScroll }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: t.syncScrollHint
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: settings.syncScroll,
								onCheckedChange: (checked) => settings.set({ syncScroll: checked })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1 pr-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t.toc }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: t.tocHint
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: settings.showToc,
								onCheckedChange: (checked) => settings.set({ showToc: checked })
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => settings.reset(),
					children: t.resetDefaults
				})
			]
		})
	});
}
var WORD_BREAKS = [
	"keep-all",
	"break-word",
	"normal"
];
var LINE_BREAKS = [
	"auto",
	"loose",
	"normal",
	"strict",
	"anywhere"
];
var LANGS = [
	"ko",
	"ja",
	"zh-CN",
	"zh-TW",
	"en"
];
var COLOR_KEYS = [
	"bg",
	"fg",
	"muted",
	"accent",
	"link",
	"codeBg",
	"heading"
];
function snapshotSettings(state) {
	return {
		preset: state.preset,
		colors: { ...state.colors },
		bodyFont: state.bodyFont,
		headingFont: state.headingFont,
		monoFont: state.monoFont,
		fontSize: state.fontSize,
		lineHeight: state.lineHeight,
		letterSpacing: state.letterSpacing,
		paragraphSpacing: state.paragraphSpacing,
		maxWidth: state.maxWidth,
		wordBreak: state.wordBreak,
		lineBreak: state.lineBreak,
		hangingPunctuation: state.hangingPunctuation,
		cjkFriendly: state.cjkFriendly,
		softBreaks: state.softBreaks,
		contentLang: state.contentLang
	};
}
async function encodeSharePayload(doc) {
	if (doc.markdown.length > 12e4) throw new Error("TOO_LONG");
	const envelope = {
		v: 1,
		markdown: doc.markdown,
		fileName: sanitizeFileName(doc.fileName),
		...doc.settings ? { settings: snapshotSettings(doc.settings) } : {}
	};
	const payload = bytesToBase64Url(await deflate(new TextEncoder().encode(JSON.stringify(envelope))));
	if (payload.length > 4e5) throw new Error("TOO_LONG");
	return payload;
}
async function decodeSharePayload(payload) {
	const cleaned = payload.trim();
	if (cleaned.length < 8 || cleaned.length > 4e5) return null;
	if (!/^[A-Za-z0-9_-]+$/.test(cleaned)) return null;
	try {
		const inflated = await inflate(base64UrlToBytes(cleaned));
		return parseEnvelope(JSON.parse(new TextDecoder().decode(inflated)));
	} catch {
		return null;
	}
}
function longShareUrl(origin, payload) {
	return `${origin}/#d=${payload}`;
}
function shortShareUrl(origin, code) {
	return `${origin}/s/${code}`;
}
function readEncodedFromLocation(location) {
	const query = new URLSearchParams(location.search).get("d");
	if (query) return query;
	const hash = location.hash;
	if (hash.startsWith("#d=")) try {
		return decodeURIComponent(hash.slice(3));
	} catch {
		return hash.slice(3);
	}
}
function stripShareFromUrl() {
	const url = new URL(window.location.href);
	const path = url.pathname.startsWith("/s/") ? "/" : url.pathname;
	url.searchParams.delete("d");
	window.history.replaceState(window.history.state, "", path);
}
function parseEnvelope(raw) {
	if (!raw || typeof raw !== "object") return null;
	const o = raw;
	if (o.v !== 1 || typeof o.markdown !== "string") return null;
	if (o.markdown.length > 12e4) return null;
	return {
		markdown: o.markdown,
		fileName: sanitizeFileName(typeof o.fileName === "string" ? o.fileName : "한지.md"),
		settings: parseSettings(o.settings)
	};
}
function parseSettings(raw) {
	if (!raw || typeof raw !== "object") return void 0;
	const o = raw;
	const preset = typeof o.preset === "string" && THEME_BY_ID.has(o.preset) ? o.preset : "hanji";
	const fallback = THEME_BY_ID.get(preset)?.colors ?? THEME_BY_ID.get("hanji").colors;
	return {
		preset,
		colors: parseColors(o.colors, fallback),
		bodyFont: knownFont(o.bodyFont, "gowun-batang"),
		headingFont: o.headingFont === "match-body" ? "match-body" : knownFont(o.headingFont, "match-body"),
		monoFont: knownFont(o.monoFont, "nanum-gothic-coding"),
		fontSize: clamp(o.fontSize, 14, 24, 17),
		lineHeight: clamp(o.lineHeight, 1.4, 2.2, 1.85),
		letterSpacing: clamp(o.letterSpacing, -.04, .08, 0),
		paragraphSpacing: clamp(o.paragraphSpacing, .4, 1.6, .9),
		maxWidth: clamp(o.maxWidth, 32, 64, 44),
		wordBreak: oneOf(o.wordBreak, WORD_BREAKS, "keep-all"),
		lineBreak: oneOf(o.lineBreak, LINE_BREAKS, "strict"),
		hangingPunctuation: bool(o.hangingPunctuation, true),
		cjkFriendly: bool(o.cjkFriendly, true),
		softBreaks: bool(o.softBreaks, false),
		contentLang: oneOf(o.contentLang, LANGS, "ko")
	};
}
function parseColors(raw, fallback) {
	const src = raw && typeof raw === "object" ? raw : {};
	const colors = { ...fallback };
	for (const key of COLOR_KEYS) {
		const value = src[key];
		if (typeof value === "string") colors[key] = normalizeHex(value, fallback[key]);
	}
	return colors;
}
function knownFont(value, fallback) {
	if (typeof value !== "string") return fallback;
	if (value === "match-body" || FONT_BY_ID.has(value)) return value;
	return fallback;
}
function sanitizeFileName(name) {
	return name.replace(/[/\\]/g, "").trim().slice(0, 80) || "한지.md";
}
function clamp(value, min, max, fallback) {
	const n = typeof value === "number" ? value : Number(value);
	if (!Number.isFinite(n)) return fallback;
	return Math.min(max, Math.max(min, n));
}
function bool(value, fallback) {
	return typeof value === "boolean" ? value : fallback;
}
function oneOf(value, allowed, fallback) {
	return typeof value === "string" && allowed.includes(value) ? value : fallback;
}
async function deflate(bytes) {
	const copy = Uint8Array.from(bytes);
	const stream = new Blob([copy]).stream().pipeThrough(new CompressionStream("deflate-raw"));
	return new Uint8Array(await new Response(stream).arrayBuffer());
}
async function inflate(bytes) {
	const copy = Uint8Array.from(bytes);
	const stream = new Blob([copy]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
	return new Uint8Array(await new Response(stream).arrayBuffer());
}
function bytesToBase64Url(bytes) {
	const chunk = 32768;
	let binary = "";
	for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
	return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}
function base64UrlToBytes(value) {
	const padded = value.replaceAll("-", "+").replaceAll("_", "/");
	const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - padded.length % 4);
	const binary = atob(padded + pad);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
function Dialog({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, { ...props });
}
function DialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, { ...props });
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-foreground/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, closeLabel = "닫기", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl bg-background p-6 shadow-lg duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: closeLabel
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid gap-1.5 pr-8", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("text-lg font-medium tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
var LONG_URL_LIMIT = 8e3;
function ShareDialog({ open, onOpenChange }) {
	const t = messages(useSettings((s) => s.uiLang));
	const [includeSettings, setIncludeSettings] = (0, import_react.useState)(true);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [shortUrl, setShortUrl] = (0, import_react.useState)("");
	const [longUrl, setLongUrl] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!open) return;
		let cancelled = false;
		setStatus("creating");
		setCopied(null);
		setError("");
		setShortUrl("");
		setLongUrl("");
		const copy = messages(useSettings.getState().uiLang);
		(async () => {
			try {
				const document = useDocument.getState();
				const settings = useSettings.getState();
				const payload = await encodeSharePayload({
					markdown: document.markdown,
					fileName: document.fileName,
					settings: includeSettings ? snapshotSettings(settings) : void 0
				});
				const origin = window.location.origin;
				const encodedUrl = longShareUrl(origin, payload);
				if (cancelled) return;
				setLongUrl(encodedUrl);
				try {
					const { code } = await createShare({ data: { payload } });
					if (cancelled) return;
					const next = shortShareUrl(origin, code);
					setShortUrl(next);
					setStatus("ready");
					await copyText(next);
					if (!cancelled) {
						setCopied("short");
						toast(copy.copiedShort);
					}
				} catch {
					if (cancelled) return;
					setStatus("fallback");
					await copyText(encodedUrl);
					if (!cancelled) {
						setCopied("long");
						toast(copy.copiedEncoded);
					}
				}
			} catch (cause) {
				if (cancelled) return;
				setStatus("error");
				const code = cause instanceof Error ? cause.message : "";
				setError(code === "TOO_LONG" ? copy.shareTooLong : copy.shareFailed);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [open, includeSettings]);
	const displayUrl = status === "fallback" ? longUrl : shortUrl;
	const showLong = Boolean(longUrl) && longUrl.length <= LONG_URL_LIMIT && (status === "ready" || status === "fallback");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			closeLabel: t.close,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t.shareTitle }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t.shareDesc })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1 pr-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "share-settings",
							children: t.includePage
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: t.includePageHint
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						id: "share-settings",
						checked: includeSettings,
						onCheckedChange: setIncludeSettings,
						disabled: status === "creating"
					})]
				}),
				status === "creating" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-4 animate-pulse" }), t.creatingLink]
				}) : null,
				status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive",
					children: error
				}) : null,
				status === "ready" || status === "fallback" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrlField, {
							label: status === "ready" ? t.shortLink : t.encodedAddress,
							value: displayUrl,
							copied: copied === (status === "ready" ? "short" : "long"),
							copyLabel: t.copy,
							onCopy: async () => {
								if (!await copyText(displayUrl)) return;
								setCopied(status === "ready" ? "short" : "long");
								toast(t.copied);
							}
						}),
						status === "ready" && showLong ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrlField, {
							label: t.encodedOriginal,
							value: longUrl,
							copied: copied === "long",
							copyLabel: t.copy,
							onCopy: async () => {
								if (!await copyText(longUrl)) return;
								setCopied("long");
								toast(t.copied);
							}
						}) : null,
						status === "fallback" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: t.fallbackHint
						}) : null
					]
				}) : null
			]
		})
	});
}
function UrlField({ label, value, copied, copyLabel, onCopy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				readOnly: true,
				value,
				className: "font-mono text-xs",
				onFocus: (event) => event.currentTarget.select()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "outline",
				size: "icon",
				className: "shrink-0",
				onClick: onCopy,
				"aria-label": copyLabel,
				children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("size-4") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {})
			})]
		})]
	});
}
async function copyText(text) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		const el = document.createElement("textarea");
		el.value = text;
		el.setAttribute("readonly", "");
		el.style.position = "fixed";
		el.style.left = "-9999px";
		document.body.appendChild(el);
		el.select();
		const ok = document.execCommand("copy");
		el.remove();
		return ok;
	}
}
function Tip({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: label })] });
}
function Toolbar({ mobile }) {
	const fileRef = (0, import_react.useRef)(null);
	const [shareOpen, setShareOpen] = (0, import_react.useState)(false);
	const t = messages(useSettings((s) => s.uiLang));
	const viewMode = useSettings((s) => s.viewMode);
	const setView = (next) => useSettings.getState().set({ viewMode: next });
	const cjkFriendly = useSettings((s) => s.cjkFriendly);
	const fileName = useDocument((s) => s.fileName);
	const markdown = useDocument((s) => s.markdown);
	const views = [
		{
			id: "edit",
			label: t.edit,
			icon: PanelLeft
		},
		{
			id: "split",
			label: t.split,
			icon: Columns2
		},
		{
			id: "preview",
			label: t.preview,
			icon: Eye
		}
	];
	const openFile = () => fileRef.current?.click();
	const onFile = async (file) => {
		if (!file) return;
		const text = await file.text();
		useDocument.getState().setMarkdown(text);
		useDocument.getState().setFileName(file.name);
		toast(t.openedFile(file.name));
	};
	const saveFile = () => {
		const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = fileName.endsWith(".md") ? fileName : `${fileName}.md`;
		link.click();
		URL.revokeObjectURL(url);
	};
	const loadSample = () => {
		useDocument.getState().setMarkdown(SAMPLE_DOCUMENT);
		useDocument.getState().setFileName("한지.md");
		toast(t.sampleLoaded);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		"data-app-chrome": true,
		className: "flex h-14 shrink-0 items-center gap-2 border-b border-border px-2 sm:px-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: ".md,.markdown,.txt,text/markdown,text/plain",
				className: "hidden",
				onChange: (event) => {
					onFile(event.target.files?.[0]);
					event.currentTarget.value = "";
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-baseline gap-2 px-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-base font-medium tracking-tight",
					children: "한지"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden truncate text-xs text-muted-foreground sm:inline",
					children: fileName
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ml-1 flex rounded-lg bg-muted p-0.5",
				children: views.map((view) => {
					const Icon = view.icon;
					if (view.id === "split") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
						label: view.label,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "icon-sm",
							"aria-pressed": viewMode === view.id,
							className: cn("max-md:hidden", viewMode === view.id && "bg-background shadow-[var(--shadow-border)]"),
							onClick: () => setView(view.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: view.label
							})]
						})
					}, view.id);
					const active = (mobile && viewMode === "split" ? "preview" : viewMode) === view.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
						label: view.label,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "icon-sm",
							"aria-pressed": active,
							className: cn(active && "bg-background shadow-[var(--shadow-border)]"),
							onClick: () => setView(view.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: view.label
							})]
						})
					}, view.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("hidden rounded-full px-2 py-1 text-xs tracking-wide sm:inline", cjkFriendly ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"),
				children: ["CJK ", cjkFriendly ? t.cjkFixed : t.cjkRaw]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex items-center gap-0.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center sm:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
								label: t.open,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "icon-sm",
									onClick: openFile,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: t.open
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
								label: t.save,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "icon-sm",
									onClick: saveFile,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: t.save
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
								label: t.sample,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "icon-sm",
									onClick: loadSample,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: t.sample
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
								label: t.print,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "icon-sm",
									onClick: () => window.print(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: t.print
									})]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
						label: t.share,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "icon-sm",
							onClick: () => setShareOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: t.share
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "icon-sm",
							className: "sm:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: t.more
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								onSelect: openFile,
								children: t.open
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								onSelect: saveFile,
								children: t.save
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								onSelect: loadSample,
								children: t.sample
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								onSelect: () => window.print(),
								children: t.print
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
						label: t.settings,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "icon-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: t.settings
								})]
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
						closeLabel: t.close,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: t.settingsTitle }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: t.settingsDesc })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanel, {})]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareDialog, {
				open: shareOpen,
				onOpenChange: setShareOpen
			})
		]
	});
}
function useMediaQuery(query) {
	const [matches, setMatches] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const media = window.matchMedia(query);
		const update = () => setMatches(media.matches);
		update();
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, [query]);
	return matches;
}
function useHydratedStores(encoded) {
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			await Promise.all([useSettings.persist.rehydrate(), useDocument.persist.rehydrate()]);
			if (cancelled) return;
			const t = messages(useSettings.getState().uiLang);
			const fromUrl = encoded || readEncodedFromLocation(window.location);
			if (!fromUrl) return;
			const doc = await decodeSharePayload(fromUrl);
			if (cancelled) return;
			if (!doc) {
				toast.error(t.shareBroken);
				stripShareFromUrl();
				return;
			}
			useDocument.setState({
				markdown: doc.markdown,
				fileName: doc.fileName
			});
			if (doc.settings) useSettings.setState({
				...doc.settings,
				viewMode: "preview"
			});
			else useSettings.setState({ viewMode: "preview" });
			stripShareFromUrl();
			toast(t.shareOpened);
		})();
		return () => {
			cancelled = true;
		};
	}, [encoded]);
}
function applyShellTheme(colors) {
	const root = document.documentElement;
	const dark = isDarkHex(colors.bg);
	root.classList.toggle("dark", dark);
	root.style.colorScheme = dark ? "dark" : "light";
	root.style.setProperty("--background", colors.bg);
	root.style.setProperty("--foreground", colors.fg);
	root.style.setProperty("--card", colors.codeBg);
	root.style.setProperty("--card-foreground", colors.fg);
	root.style.setProperty("--popover", colors.codeBg);
	root.style.setProperty("--popover-foreground", colors.fg);
	root.style.setProperty("--primary", colors.fg);
	root.style.setProperty("--primary-foreground", colors.bg);
	root.style.setProperty("--secondary", colors.codeBg);
	root.style.setProperty("--secondary-foreground", colors.fg);
	root.style.setProperty("--muted", colors.codeBg);
	root.style.setProperty("--muted-foreground", colors.muted);
	root.style.setProperty("--accent", colors.codeBg);
	root.style.setProperty("--accent-foreground", colors.fg);
	root.style.setProperty("--ring", colors.accent);
	root.style.setProperty("--md-bg", colors.bg);
	root.style.setProperty("--md-fg", colors.fg);
	document.querySelector("meta[name=\"theme-color\"]")?.setAttribute("content", colors.bg);
}
function useSyncScroll(enabled, left, right) {
	(0, import_react.useEffect)(() => {
		if (!enabled) return;
		const a = left.current;
		const b = right.current;
		if (!a || !b) return;
		let locked = null;
		const sync = (from, to, who) => {
			if (locked && locked !== who) return;
			locked = who;
			const maxFrom = from.scrollHeight - from.clientHeight;
			const maxTo = to.scrollHeight - to.clientHeight;
			to.scrollTop = (maxFrom <= 0 ? 0 : from.scrollTop / maxFrom) * Math.max(0, maxTo);
			requestAnimationFrame(() => {
				if (locked === who) locked = null;
			});
		};
		const onA = () => sync(a, b, "a");
		const onB = () => sync(b, a, "b");
		a.addEventListener("scroll", onA, { passive: true });
		b.addEventListener("scroll", onB, { passive: true });
		return () => {
			a.removeEventListener("scroll", onA);
			b.removeEventListener("scroll", onB);
		};
	}, [
		enabled,
		left,
		right
	]);
}
function Studio({ encoded }) {
	useHydratedStores(encoded);
	const mobile = useMediaQuery("(max-width: 767px)");
	const editorRef = (0, import_react.useRef)(null);
	const previewRef = (0, import_react.useRef)(null);
	const colors = useSettings((s) => s.colors);
	const uiLang = useSettings((s) => s.uiLang);
	const viewMode = useSettings((s) => s.viewMode);
	const syncScroll = useSettings((s) => s.syncScroll);
	const showToc = useSettings((s) => s.showToc);
	const cjkFriendly = useSettings((s) => s.cjkFriendly);
	const softBreaks = useSettings((s) => s.softBreaks);
	const markdown = useDocument((s) => s.markdown);
	const bodyFont = useSettings((s) => s.bodyFont);
	const headingFont = useSettings((s) => s.headingFont);
	const monoFont = useSettings((s) => s.monoFont);
	(0, import_react.useEffect)(() => {
		applyShellTheme(colors);
	}, [colors]);
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = uiLang;
	}, [uiLang]);
	const resolvedView = mobile && viewMode === "split" ? "preview" : viewMode;
	const showEditor = resolvedView !== "preview";
	const showPreview = resolvedView !== "edit";
	useSyncScroll(Boolean(syncScroll && showEditor && showPreview), editorRef, previewRef);
	const headings = (0, import_react.useMemo)(() => renderMarkdown(markdown, {
		cjkFriendly,
		softBreaks
	}).headings, [
		markdown,
		cjkFriendly,
		softBreaks
	]);
	const jump = (id) => {
		(previewRef.current?.querySelector(`#${CSS.escape(id)}`))?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col overflow-hidden bg-background text-foreground",
		"data-view": viewMode,
		style: {
			"--md-font": fontStack(bodyFont, "gowun-batang"),
			"--md-heading-font": fontStack(headingFontId({
				bodyFont,
				headingFont
			}), bodyFont),
			"--md-mono": fontStack(monoFont, "system-mono")
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontLoader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, { mobile }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1",
				children: [showToc && showPreview && !mobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					"data-app-chrome": true,
					className: "hidden w-52 shrink-0 border-r border-border lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableOfContents, {
						headings,
						onJump: jump
					})
				}) : null, showEditor && showPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(qt, {
					orientation: "horizontal",
					className: "min-h-0 min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qt, {
							id: "editor",
							minSize: "22%",
							defaultSize: "46%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownEditor, { scrollRef: editorRef })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(nn, { className: "md-resize" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qt, {
							id: "preview",
							minSize: "28%",
							defaultSize: "54%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownPreview, {
								scrollRef: previewRef,
								dark: isDarkHex(colors.bg)
							})
						})
					]
				}) : showEditor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 min-w-0 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownEditor, { scrollRef: editorRef })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 min-w-0 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownPreview, {
						scrollRef: previewRef,
						dark: isDarkHex(colors.bg)
					})
				})]
			})
		]
	});
}
//#endregion
export { messages as n, useSettings as r, Studio as t };

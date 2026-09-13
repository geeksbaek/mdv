export type AppLang = "ko" | "ja" | "zh-CN" | "zh-TW" | "en";

export const APP_LANGS: Array<{ id: AppLang; native: string }> = [
  { id: "ko", native: "한국어" },
  { id: "ja", native: "日本語" },
  { id: "zh-CN", native: "简体中文" },
  { id: "zh-TW", native: "繁體中文" },
  { id: "en", native: "English" },
];

type ThemeCopy = { name: string; description: string };

export type Messages = {
  edit: string;
  split: string;
  preview: string;
  book: string;
  bookPage: (page: number, total: number) => string;
  bookHint: string;
  open: string;
  save: string;
  sample: string;
  print: string;
  share: string;
  settings: string;
  more: string;
  close: string;
  copy: string;
  cjkFixed: string;
  cjkRaw: string;
  openedFile: (name: string) => string;
  sampleLoaded: string;
  settingsTitle: string;
  settingsDesc: string;
  appSection: string;
  appLanguage: string;
  appLanguageHint: string;
  paper: string;
  fonts: string;
  paragraph: string;
  colors: string;
  engine: string;
  body: string;
  heading: string;
  code: string;
  matchBody: string;
  headingPreview: string;
  size: string;
  fontWeight: string;
  headingWeight: string;
  weightLight: string;
  weightRegular: string;
  weightMedium: string;
  weightSemibold: string;
  weightBold: string;
  lineHeight: string;
  letterSpacing: string;
  contentWidth: string;
  paragraphGap: string;
  contentLanguage: string;
  wordBreak: string;
  wordBreakKeep: string;
  wordBreakWord: string;
  wordBreakNormal: string;
  cjkLineBreak: string;
  lbAuto: string;
  lbLoose: string;
  lbNormal: string;
  lbStrict: string;
  lbAnywhere: string;
  hangingPunct: string;
  hangingPunctHint: string;
  colorBg: string;
  colorFg: string;
  colorHeading: string;
  colorMuted: string;
  colorLink: string;
  colorCodeBg: string;
  cjkEmphasis: string;
  cjkEmphasisHint: string;
  softBreaks: string;
  softBreaksHint: string;
  syncScroll: string;
  syncScrollHint: string;
  toc: string;
  tocHint: string;
  library: string;
  libraryDesc: string;
  libraryCurrent: string;
  librarySave: string;
  librarySaveAsNew: string;
  librarySaved: (name: string) => string;
  libraryEmpty: string;
  libraryOpen: string;
  libraryDelete: string;
  libraryConfirmDelete: (name: string) => string;
  libraryUnsaved: string;
  libraryUnavailable: string;
  libraryChars: (n: number) => string;
  faceTilt: string;
  faceTiltHint: string;
  faceTiltPrivacy: string;
  faceTiltMode: string;
  faceTiltSnap: string;
  faceTiltFree: string;
  faceTiltFreeHint: string;
  faceTiltInvert: string;
  faceTiltInvertHint: string;
  faceTiltLoading: string;
  faceTiltTracking: string;
  faceTiltLost: string;
  faceTiltDenied: string;
  faceTiltUnsupported: string;
  faceTiltError: string;
  resetDefaults: string;
  themes: Record<string, ThemeCopy>;
  shareTitle: string;
  shareDesc: string;
  includePage: string;
  includePageHint: string;
  creatingLink: string;
  shareTooLong: string;
  shareFailed: string;
  copiedShort: string;
  copiedEncoded: string;
  copied: string;
  shortLink: string;
  encodedAddress: string;
  encodedOriginal: string;
  fallbackHint: string;
  shareBroken: string;
  shareOpened: string;
  markdownSource: string;
  copiedCode: string;
  tocLabel: string;
  noHeadings: string;
  untitledDocument: string;
  appTitle: string;
  linkMissing: string;
  linkMissingHint: string;
  backHome: string;
};

const ko: Messages = {
  edit: "편집",
  split: "분할",
  preview: "보기",
  book: "책",
  bookPage: (p, t) => `${p} / ${t}쪽`,
  bookHint: "모서리를 끌거나 클릭해 넘기세요. 방향키와 휠도 됩니다.",
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
  fontWeight: "본문 굵기",
  headingWeight: "제목 굵기",
  weightLight: "가늘게",
  weightRegular: "보통",
  weightMedium: "중간",
  weightSemibold: "세미볼드",
  weightBold: "굵게",
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
  library: "내 문서",
  libraryDesc: "이 브라우저 안에만 저장되는 문서 목록입니다. 다른 기기나 서버로 전송되지 않습니다.",
  libraryCurrent: "현재 문서",
  librarySave: "브라우저에 저장",
  librarySaveAsNew: "새 문서로 저장",
  librarySaved: (name) => `${name} 문서를 저장했습니다`,
  libraryEmpty: "저장된 문서가 없습니다.",
  libraryOpen: "열기",
  libraryDelete: "삭제",
  libraryConfirmDelete: (name) => `${name} 문서를 삭제할까요? 되돌릴 수 없습니다.`,
  libraryUnsaved: "저장하지 않은 변경이 있습니다. 그래도 다른 문서를 열까요?",
  libraryUnavailable: "이 브라우저에서는 저장소를 쓸 수 없습니다.",
  libraryChars: (n) => `${n.toLocaleString("ko")}자`,
  faceTilt: "얼굴 따라 회전",
  faceTiltHint:
    "전면 카메라로 얼굴 기울기를 읽어 글을 눈높이에 맞춥니다. 누워서 읽을 때 유용합니다.",
  faceTiltPrivacy: "영상은 기기 안에서만 처리되며 어디에도 전송되지 않습니다.",
  faceTiltMode: "회전 방식",
  faceTiltSnap: "90도 단위",
  faceTiltFree: "자유 회전",
  faceTiltFreeHint:
    "자유 회전에서는 pretext로 줄마다 폭을 다시 계산해 기울어진 화면을 끝까지 채웁니다. 이때는 본문이 글자만으로 표시됩니다.",
  faceTiltInvert: "방향 반전",
  faceTiltInvertHint: "글이 반대로 돌면 켜세요.",
  faceTiltLoading: "카메라를 준비하는 중…",
  faceTiltTracking: "얼굴을 따라가는 중",
  faceTiltLost: "얼굴을 찾는 중…",
  faceTiltDenied: "카메라 권한이 거부되었습니다.",
  faceTiltUnsupported: "이 기기에서는 카메라를 쓸 수 없습니다.",
  faceTiltError: "얼굴 인식을 시작하지 못했습니다.",
  resetDefaults: "글꼴·용지 기본값",
  themes: {
    hanji: { name: "한지", description: "따뜻한 닥종이" },
    snow: { name: "눈", description: "맑은 흰 지면" },
    sepia: { name: "세피아", description: "오래된 책" },
    ink: { name: "먹", description: "깊은 먹물" },
    night: { name: "밤", description: "남색 야간" },
    contrast: { name: "고대비", description: "흑백 대비" },
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
  untitledDocument: "제목 없는 문서",
  appTitle: "CJK 마크다운",
  linkMissing: "링크를 찾을 수 없습니다",
  linkMissingHint: "만료되었거나 잘못된 주소입니다. 새로 공유하면 다른 짧은 링크가 만들어집니다.",
  backHome: "한지로 돌아가기",
};

const ja: Messages = {
  edit: "編集",
  split: "分割",
  preview: "表示",
  book: "本",
  bookPage: (p, t) => `${p} / ${t}ページ`,
  bookHint: "角をドラッグまたはクリックしてめくります。矢印キーとホイールも使えます。",
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
  fontWeight: "本文の太さ",
  headingWeight: "見出しの太さ",
  weightLight: "細く",
  weightRegular: "標準",
  weightMedium: "中間",
  weightSemibold: "セミボールド",
  weightBold: "太く",
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
  library: "マイ文書",
  libraryDesc: "このブラウザ内にだけ保存される文書一覧です。他の端末やサーバーへは送信されません。",
  libraryCurrent: "現在の文書",
  librarySave: "ブラウザに保存",
  librarySaveAsNew: "新しい文書として保存",
  librarySaved: (name) => `${name} を保存しました`,
  libraryEmpty: "保存された文書はありません。",
  libraryOpen: "開く",
  libraryDelete: "削除",
  libraryConfirmDelete: (name) => `${name} を削除しますか？元に戻せません。`,
  libraryUnsaved: "保存していない変更があります。別の文書を開きますか？",
  libraryUnavailable: "このブラウザではストレージを使用できません。",
  libraryChars: (n) => `${n.toLocaleString("ja")}文字`,
  faceTilt: "顔に合わせて回転",
  faceTiltHint:
    "前面カメラで顔の傾きを読み取り、文章を目線に合わせます。寝転んで読むときに便利です。",
  faceTiltPrivacy: "映像は端末内でのみ処理され、どこにも送信されません。",
  faceTiltMode: "回転方式",
  faceTiltSnap: "90度単位",
  faceTiltFree: "自由回転",
  faceTiltFreeHint:
    "自由回転では pretext が行ごとに幅を計算し直し、傾いた画面を端まで埋めます。本文は文字のみで表示されます。",
  faceTiltInvert: "方向を反転",
  faceTiltInvertHint: "逆方向に回る場合はオンにしてください。",
  faceTiltLoading: "カメラを準備中…",
  faceTiltTracking: "顔を追跡中",
  faceTiltLost: "顔を探しています…",
  faceTiltDenied: "カメラの許可が拒否されました。",
  faceTiltUnsupported: "この端末ではカメラを使用できません。",
  faceTiltError: "顔認識を開始できませんでした。",
  resetDefaults: "フォント・用紙を初期化",
  themes: {
    hanji: { name: "韓紙", description: "あたたかい和紙" },
    snow: { name: "雪", description: "澄んだ白い紙面" },
    sepia: { name: "セピア", description: "古い本" },
    ink: { name: "墨", description: "深い墨色" },
    night: { name: "夜", description: "藍色の夜" },
    contrast: { name: "高コントラスト", description: "白黒の対比" },
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
  untitledDocument: "無題の文書",
  appTitle: "CJK Markdown",
  linkMissing: "リンクが見つかりません",
  linkMissingHint: "期限切れか、誤ったアドレスです。新しく共有すると別の短いリンクになります。",
  backHome: "韓紙に戻る",
};

const zhCN: Messages = {
  edit: "编辑",
  split: "分栏",
  preview: "预览",
  book: "书",
  bookPage: (p, t) => `第 ${p} / ${t} 页`,
  bookHint: "拖动或点击页角翻页，也可使用方向键和滚轮。",
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
  fontWeight: "正文粗细",
  headingWeight: "标题粗细",
  weightLight: "细",
  weightRegular: "常规",
  weightMedium: "中等",
  weightSemibold: "半粗",
  weightBold: "粗",
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
  library: "我的文档",
  libraryDesc: "仅保存在此浏览器中的文档列表，不会发送到其他设备或服务器。",
  libraryCurrent: "当前文档",
  librarySave: "保存到浏览器",
  librarySaveAsNew: "另存为新文档",
  librarySaved: (name) => `已保存 ${name}`,
  libraryEmpty: "没有已保存的文档。",
  libraryOpen: "打开",
  libraryDelete: "删除",
  libraryConfirmDelete: (name) => `要删除 ${name} 吗？此操作无法撤销。`,
  libraryUnsaved: "有未保存的更改。仍要打开其他文档吗？",
  libraryUnavailable: "此浏览器无法使用存储。",
  libraryChars: (n) => `${n.toLocaleString("zh-CN")} 字`,
  faceTilt: "跟随面部旋转",
  faceTiltHint: "通过前置摄像头读取面部倾斜，让文字与视线对齐。躺着阅读时很有用。",
  faceTiltPrivacy: "画面仅在设备内处理，不会发送到任何地方。",
  faceTiltMode: "旋转方式",
  faceTiltSnap: "按 90 度",
  faceTiltFree: "自由旋转",
  faceTiltFreeHint:
    "自由旋转时由 pretext 逐行重新计算宽度，把倾斜的屏幕填满。此时正文仅以文字显示。",
  faceTiltInvert: "反转方向",
  faceTiltInvertHint: "如果文字转向相反，请打开。",
  faceTiltLoading: "正在准备摄像头…",
  faceTiltTracking: "正在跟随面部",
  faceTiltLost: "正在寻找面部…",
  faceTiltDenied: "摄像头权限被拒绝。",
  faceTiltUnsupported: "此设备无法使用摄像头。",
  faceTiltError: "无法启动面部识别。",
  resetDefaults: "恢复字体与纸张默认值",
  themes: {
    hanji: { name: "韩纸", description: "温润的皮纸" },
    snow: { name: "雪", description: "清亮白纸" },
    sepia: { name: "褐彩", description: "旧书" },
    ink: { name: "墨", description: "深墨" },
    night: { name: "夜", description: "靛蓝夜间" },
    contrast: { name: "高对比", description: "黑白对比" },
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
  untitledDocument: "无标题文档",
  appTitle: "CJK Markdown",
  linkMissing: "找不到链接",
  linkMissingHint: "链接已过期或地址有误。重新分享会生成新的短链接。",
  backHome: "返回韩纸",
};

const zhTW: Messages = {
  edit: "編輯",
  split: "分割",
  preview: "預覽",
  book: "書",
  bookPage: (p, t) => `第 ${p} / ${t} 頁`,
  bookHint: "拖曳或點擊頁角翻頁，也可使用方向鍵與滾輪。",
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
  fontWeight: "正文粗細",
  headingWeight: "標題粗細",
  weightLight: "細",
  weightRegular: "常規",
  weightMedium: "中等",
  weightSemibold: "半粗",
  weightBold: "粗",
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
  library: "我的文件",
  libraryDesc: "僅保存在此瀏覽器中的文件清單，不會傳送到其他裝置或伺服器。",
  libraryCurrent: "目前文件",
  librarySave: "儲存到瀏覽器",
  librarySaveAsNew: "另存為新文件",
  librarySaved: (name) => `已儲存 ${name}`,
  libraryEmpty: "沒有已儲存的文件。",
  libraryOpen: "開啟",
  libraryDelete: "刪除",
  libraryConfirmDelete: (name) => `要刪除 ${name} 嗎？此操作無法復原。`,
  libraryUnsaved: "有未儲存的變更。仍要開啟其他文件嗎？",
  libraryUnavailable: "此瀏覽器無法使用儲存空間。",
  libraryChars: (n) => `${n.toLocaleString("zh-TW")} 字`,
  faceTilt: "跟隨臉部旋轉",
  faceTiltHint: "透過前鏡頭讀取臉部傾斜，讓文字與視線對齊。躺著閱讀時很實用。",
  faceTiltPrivacy: "影像僅在裝置內處理，不會傳送到任何地方。",
  faceTiltMode: "旋轉方式",
  faceTiltSnap: "以 90 度為單位",
  faceTiltFree: "自由旋轉",
  faceTiltFreeHint:
    "自由旋轉時由 pretext 逐行重新計算寬度，將傾斜的畫面填滿。此時內文僅以文字顯示。",
  faceTiltInvert: "反轉方向",
  faceTiltInvertHint: "若文字轉向相反，請開啟。",
  faceTiltLoading: "正在準備相機…",
  faceTiltTracking: "正在跟隨臉部",
  faceTiltLost: "正在尋找臉部…",
  faceTiltDenied: "相機權限遭拒。",
  faceTiltUnsupported: "此裝置無法使用相機。",
  faceTiltError: "無法啟動臉部辨識。",
  resetDefaults: "還原字型與用紙預設值",
  themes: {
    hanji: { name: "韓紙", description: "溫潤的皮紙" },
    snow: { name: "雪", description: "清亮白紙" },
    sepia: { name: "褐彩", description: "舊書" },
    ink: { name: "墨", description: "深墨" },
    night: { name: "夜", description: "靛藍夜間" },
    contrast: { name: "高對比", description: "黑白對比" },
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
  untitledDocument: "無標題文件",
  appTitle: "CJK Markdown",
  linkMissing: "找不到連結",
  linkMissingHint: "連結已過期或網址有誤。重新分享會產生新的短網址。",
  backHome: "返回韓紙",
};

const en: Messages = {
  edit: "Edit",
  split: "Split",
  preview: "Preview",
  book: "Book",
  bookPage: (p, t) => `Page ${p} of ${t}`,
  bookHint: "Drag or click a page corner to turn it. Arrow keys and the wheel work too.",
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
  fontWeight: "Body weight",
  headingWeight: "Heading weight",
  weightLight: "Light",
  weightRegular: "Regular",
  weightMedium: "Medium",
  weightSemibold: "Semibold",
  weightBold: "Bold",
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
  library: "My documents",
  libraryDesc: "Documents kept in this browser only. Nothing is sent to other devices or servers.",
  libraryCurrent: "Current document",
  librarySave: "Save in browser",
  librarySaveAsNew: "Save as new",
  librarySaved: (name) => `Saved ${name}`,
  libraryEmpty: "No saved documents yet.",
  libraryOpen: "Open",
  libraryDelete: "Delete",
  libraryConfirmDelete: (name) => `Delete ${name}? This cannot be undone.`,
  libraryUnsaved: "You have unsaved changes. Open another document anyway?",
  libraryUnavailable: "Storage is not available in this browser.",
  libraryChars: (n) => `${n.toLocaleString("en")} chars`,
  faceTilt: "Follow your face",
  faceTiltHint:
    "Reads your head tilt with the front camera and keeps the text level with your eyes. Handy when reading lying down.",
  faceTiltPrivacy: "Video is processed on this device only and never leaves it.",
  faceTiltMode: "Rotation",
  faceTiltSnap: "90° steps",
  faceTiltFree: "Free rotation",
  faceTiltFreeHint:
    "In free rotation, pretext re-computes every line's width so text fills the tilted screen edge to edge. The body is shown as plain text.",
  faceTiltInvert: "Flip direction",
  faceTiltInvertHint: "Turn on if the text rotates the wrong way.",
  faceTiltLoading: "Starting the camera…",
  faceTiltTracking: "Following your face",
  faceTiltLost: "Looking for a face…",
  faceTiltDenied: "Camera permission was denied.",
  faceTiltUnsupported: "The camera is not available on this device.",
  faceTiltError: "Face tracking could not start.",
  resetDefaults: "Reset fonts and paper",
  themes: {
    hanji: { name: "Hanji", description: "Warm mulberry paper" },
    snow: { name: "Snow", description: "Clear white sheet" },
    sepia: { name: "Sepia", description: "Old book" },
    ink: { name: "Ink", description: "Deep sumi" },
    night: { name: "Night", description: "Indigo evening" },
    contrast: { name: "Contrast", description: "Black and white" },
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
  untitledDocument: "Untitled document",
  appTitle: "CJK Markdown",
  linkMissing: "Link not found",
  linkMissingHint: "This address is expired or invalid. Sharing again creates a new short link.",
  backHome: "Back to Hanji",
};

export const MESSAGES: Record<AppLang, Messages> = {
  ko,
  ja,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  en,
};

export function isAppLang(value: unknown): value is AppLang {
  return (
    value === "ko" || value === "ja" || value === "zh-CN" || value === "zh-TW" || value === "en"
  );
}

export function detectBrowserLang(input?: string): AppLang {
  const raw = (input ?? (typeof navigator === "undefined" ? "" : navigator.language)).toLowerCase();
  if (raw.startsWith("ko")) return "ko";
  if (raw.startsWith("ja")) return "ja";
  if (
    raw.startsWith("zh-tw") ||
    raw.startsWith("zh-hant") ||
    raw.includes("hk") ||
    raw.includes("mo")
  ) {
    return "zh-TW";
  }
  if (raw.startsWith("zh")) return "zh-CN";
  if (raw.startsWith("en")) return "en";
  return "ko";
}

export function messages(lang: string | undefined): Messages {
  return isAppLang(lang) ? MESSAGES[lang] : ko;
}

export function htmlLang(lang: AppLang): string {
  return lang;
}

export function weightName(weight: number, lang: string | undefined): string {
  const t = messages(lang);
  if (weight <= 300) return t.weightLight;
  if (weight <= 400) return t.weightRegular;
  if (weight <= 500) return t.weightMedium;
  if (weight <= 600) return t.weightSemibold;
  return t.weightBold;
}

import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as Route } from "./router-DORzhVoT.mjs";
import { n as messages, r as useSettings, t as Studio } from "./studio-FtP-038R.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/s._code-BiglwbDZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SharedDocument() {
	const { payload } = Route.useLoaderData();
	const t = messages(useSettings((s) => s.uiLang));
	(0, import_react.useEffect)(() => {
		useSettings.persist.rehydrate();
	}, []);
	if (!payload) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex h-dvh flex-col items-center justify-center gap-3 bg-background px-6 text-center text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-medium tracking-tight",
				children: t.linkMissing
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-sm text-muted-foreground",
				children: t.linkMissingHint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-sm underline underline-offset-4",
				children: t.backHome
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Studio, { encoded: payload });
}
//#endregion
export { SharedDocument as component };

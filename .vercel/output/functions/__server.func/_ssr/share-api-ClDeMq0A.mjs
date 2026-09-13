import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/share-api-ClDeMq0A.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var MAX_SHARE_PAYLOAD = 4e5;
var createShare_createServerFn_handler = createServerRpc({
	id: "9417dd112327904f10719e0d2a09b21702354343caeda33bb1f3e17454e5fec3",
	name: "createShare",
	filename: "src/lib/share-api.ts"
}, (opts) => createShare.__executeServer(opts));
var createShare = createServerFn({ method: "POST" }).validator((input) => {
	const payload = typeof input === "object" && input && "payload" in input ? String(input.payload) : "";
	if (payload.length < 8 || payload.length > MAX_SHARE_PAYLOAD || !/^[A-Za-z0-9_-]+$/.test(payload)) throw new Error("Invalid share payload");
	return { payload };
}).handler(createShare_createServerFn_handler, async ({ data }) => {
	const { getSql } = await import("./db-QS9tETWH.mjs");
	const sql = await getSql();
	const digest = bytesToBase64Url(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data.payload))));
	for (const length of [
		8,
		10,
		12,
		16
	]) {
		const code = digest.slice(0, length);
		const row = (await sql`
        select payload from shares where code = ${code} limit 1
      `)[0];
		if (!row) {
			await sql`insert into shares (code, payload) values (${code}, ${data.payload})`;
			return { code };
		}
		if (row.payload === data.payload) return { code };
	}
	throw new Error("Could not allocate a short code");
});
var getShare_createServerFn_handler = createServerRpc({
	id: "50016a4edde0778a1f0cadbddb8e9a37d3998979b490f832e1ff9ef94bd727a5",
	name: "getShare",
	filename: "src/lib/share-api.ts"
}, (opts) => getShare.__executeServer(opts));
var getShare = createServerFn({ method: "GET" }).validator((input) => {
	const code = typeof input === "object" && input && "code" in input ? String(input.code) : "";
	if (!/^[A-Za-z0-9_-]{4,16}$/.test(code)) throw new Error("Invalid share code");
	return { code };
}).handler(getShare_createServerFn_handler, async ({ data }) => {
	const { getSql } = await import("./db-QS9tETWH.mjs");
	return { payload: (await (await getSql())`
      select payload from shares where code = ${data.code} limit 1
    `)[0]?.payload ?? null };
});
function bytesToBase64Url(bytes) {
	const chunk = 32768;
	let binary = "";
	for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
	return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}
//#endregion
export { createShare_createServerFn_handler, getShare_createServerFn_handler };

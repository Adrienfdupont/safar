import "../../chunks/server.js";
//#region src/routes/+page.svelte
function _page($$renderer) {
	$$renderer.push(`<h1>Safar</h1> <p><a href="/users">View Users</a></p>`);
}
//#endregion
export { _page as default };

import "../../../chunks/index-server.js";
import { _ as escape_html, n as ensure_array_like } from "../../../chunks/server.js";
//#region src/routes/users/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let users = [];
		$$renderer.push(`<h1>Users</h1> <ul><!--[-->`);
		const each_array = ensure_array_like(users);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let user = each_array[$$index];
			$$renderer.push(`<li>${escape_html(user.name)}</li>`);
		}
		$$renderer.push(`<!--]--></ul>`);
	});
}
//#endregion
export { _page as default };

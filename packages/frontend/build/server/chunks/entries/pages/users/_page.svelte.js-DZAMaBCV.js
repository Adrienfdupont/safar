import { X as ensure_array_like, V as escape_html } from '../../../chunks/server.js-C9G_oFH3.js';
import '../../../chunks/shared.js-DB7eQQpE.js';

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

export { _page as default };
//# sourceMappingURL=_page.svelte.js-DZAMaBCV.js.map



export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/users/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.C_56Xomb.js","_app/immutable/chunks/CK1TE3_G.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];

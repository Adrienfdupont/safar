

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CYj5B2cI.js","_app/immutable/chunks/CK1TE3_G.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DEIdtHbd.js"];
export const stylesheets = ["_app/immutable/assets/0.CgBMz159.css"];
export const fonts = [];

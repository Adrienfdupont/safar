

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.qoXpKKc1.js","_app/immutable/chunks/CK1TE3_G.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DEIdtHbd.js"];
export const stylesheets = ["_app/immutable/assets/2.B0exfcoC.css"];
export const fonts = [];

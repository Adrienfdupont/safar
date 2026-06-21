

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/users/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.C3cMbAom.js","_app/immutable/chunks/B8FBzWjY.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/CJFzawdq.js"];
export const stylesheets = [];
export const fonts = [];

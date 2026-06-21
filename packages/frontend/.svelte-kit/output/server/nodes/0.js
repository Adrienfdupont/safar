

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BF6iZlyl.js","_app/immutable/chunks/B8FBzWjY.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/CJFzawdq.js"];
export const stylesheets = [];
export const fonts = [];

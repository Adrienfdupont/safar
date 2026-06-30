const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon-48.png","icon-1024.png","icon-180.png","icon-192.png","icon-384.png","icon-512.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.CiTyPlnT.js",app:"_app/immutable/entry/app.Bn3GcRvl.js",imports:["_app/immutable/entry/start.CiTyPlnT.js","_app/immutable/chunks/DibqCefE.js","_app/immutable/chunks/CK1TE3_G.js","_app/immutable/entry/app.Bn3GcRvl.js","_app/immutable/chunks/CK1TE3_G.js","_app/immutable/chunks/kNaey6uv.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js-BZza87_H.js')),
			__memo(() => import('./nodes/1.js-BOBGTI5B.js')),
			__memo(() => import('./nodes/2.js-Bjw91mx1.js')),
			__memo(() => import('./nodes/3.js-D1BcEFk4.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/users",
				pattern: /^\/users\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export { manifest as m };
//# sourceMappingURL=manifest.js-DI1Pi7rh.js.map

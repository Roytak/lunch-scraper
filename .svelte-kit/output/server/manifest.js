export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.BNDAfJM2.js","app":"_app/immutable/entry/app.BUw3hEac.js","imports":["_app/immutable/entry/start.BNDAfJM2.js","_app/immutable/chunks/entry.1eUIbyn7.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.BUw3hEac.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.CpNZCCSw.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/lunch-scraper",
				pattern: /^\/api\/lunch-scraper\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/lunch-scraper/_server.ts.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "latest",
	routeRules: {
		"/api/**": { proxy: { to: "https://api.inicontent.com/**" } }, // Proxy API requests to the Inicontent API
	},
	hooks: {
		"pages:extend"(pages) {
			pages.push(
				...[
					{
						name: "urgences",
						path: "/admin/tables/urgences",
						file: "~/pages/admin/tables/urgences/index.vue",
					},
					{
						name: "traumatoA",
						path: "/admin/tables/traumatoA",
						file: "~/pages/admin/tables/traumatoA/index.vue",
					},
				],
			);
		},
	},
	pwa: {
		manifest: {
			name: "CHU Oujda",
			short_name: "CHUO",
			theme_color: "#4664a7",
			icons: [
				{
					src: "/pwa-192x192.png",
					sizes: "192x192",
					type: "image/png",
					purpose: "any",
				},
				{
					src: "/pwa-512x512.png",
					sizes: "512x512",
					type: "image/png",
					purpose: "any",
				},
				{
					src: "/pwa-maskable-192x192.png",
					sizes: "192x192",
					type: "image/png",
					purpose: "maskable",
				},
				{
					src: "/pwa-maskable-512x512.png",
					sizes: "512x512",
					type: "image/png",
					purpose: "maskable",
				},
			],
		},
		workbox: {
			navigateFallback: "/",
		},
		devOptions: {
			enabled: true,
			type: "module",
		},
	},
	extends:
		process.env.NODE_ENV !== "production"
			? [["../inicontent", { install: true }]]
			: [["github:inicontent/inicontent", { install: true }]],
});

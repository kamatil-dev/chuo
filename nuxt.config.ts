// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "latest",
	appConfig: {
		database: "chuo",
		// fileBase: "https://files.inicontent.com/"
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
	extends:
		process.env.NODE_ENV !== "production"
			? [["../inicontent", { install: true }]]
			: [["github:inicontent/inicontent", { install: true }]],
});

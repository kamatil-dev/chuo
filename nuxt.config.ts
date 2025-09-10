// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: 'latest',
  appConfig: {
    database: "urgences"
  },
  hooks: {
    "pages:extend"(pages) {
      pages.push(
        ...[
          {
            name: "patient",
            path: "/admin/tables/patient",
            file: "~/pages/admin/tables/patient/index.vue",
          },
        ]
      )
    }
  },
  extends:
    process.env.NODE_ENV === "development"
      ? [["../inicontent", { install: true }]]
      : [["github:inicontent/inicontent", { install: true }]],
});

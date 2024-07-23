// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/content', '@nuxtjs/tailwindcss', 'nuxt-lodash'],
    routeRules: {
        '/': { prerender: true }
    },
    lodash: {
        prefix: '_'
    }
})
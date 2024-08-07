// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/content', '@nuxtjs/tailwindcss', 'nuxt-lodash', "@nuxt/image"],
    routeRules: {
        '/': { prerender: true }
    },
    lodash: {
        prefix: '_'
    },
    app: {
        head: {
            meta: [
                {
                    name: 'robots',
                    content: 'noindex'
                },

            ]
        }
    },
    content: {
        highlight: {
            theme: 'github-dark',
            langs: [
                'js',
                'json',
                'html',
                'php',
                'sql',
                'vue-html',
                'vue',
                'bash',
                'blade'
            ]
        }
    }
})
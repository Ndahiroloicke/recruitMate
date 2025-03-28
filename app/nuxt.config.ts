export default defineNuxtConfig({
    ssr: false,
    compatibilityDate: '2024-11-01',
    devtools: { enabled: false },
    nitro: {
        preset: 'cloudflare-pages',
        experimental: {
            openAPI: true,
            asyncContext: true,
        },
        externals: {
            inline: [
                'readable-stream',
                'string_decoder',
                'unenv/runtime/node/string_decoder',
                'unenv/runtime/node/string_decoder/index',
                'unenv/runtime/node/string_decoder/index/',
                'unenv/runtime/npm/consola'
            ]
        },
        moduleSideEffects: ['pdfjs-dist', 'archiver'],
        minify: true,
        sourceMap: false,
        prerender: {
            failOnError: false,
        },
    },
    vite: {
        assetsInclude: ['**/*.md'],
        build: {
            chunkSizeWarningLimit: 2000,
            rollupOptions: {
                external: ['sharp'],
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            if (id.includes('@tiptap')) return 'editor'
                            if (id.includes('pdf')) return 'pdf'
                            if (id.includes('@capacitor')) return 'mobile'
                            if (id.includes('openai')) return 'ai'
                            if (id.includes('vue')) return 'vue-vendor'
                            return 'vendor'
                        }
                    }
                },
            },
            target: 'esnext',
            minify: 'esbuild',
            cssMinify: true,
            sourcemap: false
        },
        resolve: {
            alias: {
                'unenv/runtime/node/string_decoder': 'string_decoder-browserify',
                'unenv/runtime/node/string_decoder/index': 'string_decoder-browserify',
                'unenv/runtime/node/string_decoder/index/': 'string_decoder-browserify',
                'string_decoder': 'string_decoder-browserify',
                stream: 'stream-browserify',
            }
        },
        optimizeDeps: {
            exclude: ['openai', 'sharp']
        }
    },
    alias: {
        'node:buffer': 'buffer',
    },
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        'shadcn-nuxt',
        '@nuxtjs/supabase',
        '@nuxt/icon',
        '@vueuse/nuxt',
        '@nuxt/image',
        '@nuxt/fonts',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/ionic',
        '@nuxtjs/mdc',
        '@nuxthub/core',
    ],
    ignore: [
        '**/*.stories.{js,cts,mts,ts,jsx,tsx}',
        '**/*.{spec,test}.{js,cts,mts,ts,jsx,tsx}',
        '**/.{pnpm-store,vercel,netlify,output,git,cache,data}',
        '.nuxt/analyze',
        '**/-*.*',
    ],
    fonts: {
        families: [
            { name: 'Flow Rounded', provider: 'google' },
        ],
    },
    ionic: {
        css: {
            basic: false,
            core: false,
            utilities: false,
        },
    },
    icon: {
        customCollections: [
            {
                prefix: 'recruitmate',
                dir: './assets/icons',
            },
        ],
    },
    supabase: {
        cookieOptions: {
            maxAge: 60 * 60 * 8,
            sameSite: 'lax',
            secure: true,
        },
        clientOptions: {
            auth: {
                detectSessionInUrl: true,
                persistSession: true,
                autoRefreshToken: true,
            },
        },
        redirectOptions: {
            login: '/auth',
            callback: '',
        },
    },
    experimental: {
        watcher: 'parcel',
        buildCache: true,
        restoreState: true,
        sharedPrerenderData: true,
        compileTemplate: true,
        templateUtils: true,
        relativeWatchPaths: true,
        resetAsyncDataToUndefined: true,
        defaults: {
            useAsyncData: {
                deep: true,
            },
        },
        payloadExtraction: false,
        treeshakeClientOnly: true,
        asyncEntry: true
    },
    future: {
        compatibilityVersion: 4,
    },
    features: {
        devLogs: true,
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        rootAttrs: {
            id: 'recruitmate',
            prefix: 'rm',
        },
        head: {
            title: 'Recruitmate - Smart Hiring Platform',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'theme-color', content: '#4A90E2' },
                { name: 'author', content: 'Recruitmate Team' },
                { name: 'description', content: 'Recruitmate is an intelligent hiring platform that streamlines the recruitment process with AI-driven tools.' },
                { name: 'keywords', content: 'hiring, recruitment, AI hiring, job applications, recruitmate' },
                { property: 'og:title', content: 'Recruitmate - Smart Hiring Platform' },
                { property: 'og:description', content: 'AI-powered hiring platform to find the best candidates effortlessly.' },
                { property: 'og:image', content: '/recruitmate-preview.png' },
                { property: 'og:url', content: 'https://recruitmate.com' },
                { property: 'og:type', content: 'website' },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: 'Recruitmate - Smart Hiring Platform' },
                { name: 'twitter:description', content: 'AI-powered hiring platform to find the best candidates effortlessly.' },
                { name: 'twitter:image', content: '/recruitmate-preview.png' },
            ],
            link: [
                { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
                { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
                { rel: 'shortcut icon', href: '/favicon.ico' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
            ],
            script: [
                {
                    src: 'https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js',
                    defer: true,
                },
            ],
        },
    },
    runtimeConfig: {
        public: {
            supabase: {
                url: process.env.SUPABASE_URL,
                key: process.env.SUPABASE_KEY,
            }
        }
    },
    build: {
        transpile: ['pdfjs-dist', 'readable-stream']
    },
    builder: 'vite'
})

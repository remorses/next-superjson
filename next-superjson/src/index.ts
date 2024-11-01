import fs from 'fs'
import path from 'path'

import { NextConfig } from 'next'

export interface NextSuperjsonConfig {}

export function withSuperjson(withSuperjson: NextSuperjsonConfig = {}) {
    return (nextConfig: NextConfig = {}): NextConfig => {
        return {
            ...nextConfig,

            webpack(config: import('webpack').Configuration, options) {
                const {} = withSuperjson
                const { isServer, dev, dir } = options
                const pagesDir = findPagesDir(dir)

                config.module = config.module || {}
                config.module.rules = config.module.rules || []
                config.module.rules.push({
                    test: /\.(tsx|ts|js|mjs|jsx)$/,
                    include: [pagesDir],
                    use: [
                        // options.defaultLoaders.babel,
                        {
                            loader: require.resolve('./turbopackLoader'),
                            options: {
                                isServer,
                                pagesDir,
                            },
                        },
                    ],
                })

                if (typeof nextConfig.webpack === 'function') {
                    return nextConfig.webpack(config, options)
                } else {
                    return config
                }
            },
        }
    }
}

// taken from https://github.com/vercel/next.js/blob/v12.1.5/packages/next/lib/find-pages-dir.ts
export function findPagesDir(dir: string): string {
    // prioritize ./pages over ./src/pages
    let curDir = path.join(dir, 'pages')
    if (fs.existsSync(curDir)) return curDir

    curDir = path.join(dir, 'src/pages')
    if (fs.existsSync(curDir)) return curDir

    // Check one level up the tree to see if the pages directory might be there
    if (fs.existsSync(path.join(dir, '..', 'pages'))) {
        throw new Error(
            'No `pages` directory found. Did you mean to run `next` in the parent (`../`) directory?',
        )
    }

    throw new Error(
        "Couldn't find a `pages` directory. Please create one under the project root",
    )
}

function applyTurbopackOptions(nextConfig: NextConfig): void {
    nextConfig.experimental ??= {}
    nextConfig.experimental.turbo ??= {}
    nextConfig.experimental.turbo.rules ??= {}

    const rules = nextConfig.experimental.turbo.rules

    const pagesDir = findPagesDir(process.cwd())
    const options = { pagesDir }
    const glob = '{./src/pages,./pages/}/**/*.{ts,tsx,js,jsx}'
    rules[glob] ??= {}
    const globbed: any = rules[glob]
    globbed.browser ??= {}
    globbed.browser.loaders ??= []
    globbed.browser.as = '*.js'
    globbed.browser.loaders.push({
        loader: require.resolve('../dist/turbopackLoader'),
        options: { ...options, isServer: false },
    })
    globbed.default ??= {}
    globbed.default.loaders ??= []
    globbed.default.as = '*.js'
    globbed.default.loaders.push({
        loader: require.resolve('../dist/turbopackLoader'),
        options: { ...options, isServer: true },
    })
}

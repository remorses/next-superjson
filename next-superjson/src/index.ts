import { findPagesDir } from 'next/dist/lib/find-pages-dir'

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
                        options.defaultLoaders.babel,
                        {
                            loader: 'babel-loader',
                            options: {
                                sourceMaps: dev,
                                plugins: [
                                    [
                                        require.resolve(
                                            'babel-plugin-superjson-next',
                                        ),
                                        {},
                                    ],
                                    require.resolve('@babel/plugin-syntax-jsx'),
                                    [
                                        require.resolve(
                                            '@babel/plugin-syntax-typescript',
                                        ),
                                        { isTSX: true },
                                    ],
                                ],
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

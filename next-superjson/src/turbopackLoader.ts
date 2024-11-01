import * as swc from '@swc/core'
import fs from 'fs'
import path from 'path'
import type webpack from 'webpack'

import { logger, shouldBeSkipped } from './utils'

export default async function (
    this: LoaderThis<any>,
    source: string,
    map: any,
) {
    if (typeof map === 'string') {
        map = JSON.parse(map)
    }
    // eslint-disable-next-line no-console
    // console.log(JSON.stringify(this, null, 2))
    const callback = this.async()

    try {
        const options = this.getOptions()
        const { isServer, pagesDir } = options

        // console.log('isServer', isServer)
        if (shouldBeSkipped({ filePath: this.resourcePath || '', pagesDir })) {
            callback(null, source, map)
            return
        }

        const res = await swc.transform(source, {
            // Some options cannot be specified in .swcrc
            filename: this.resourcePath,
            sourceMaps: true,
            inputSourceMap: map,
            // Input files are treated as module by default.
            // isModule: false,
            minify: false,

            // All options below can be configured via .swcrc
            jsc: {
                experimental: {
                    plugins: [[require.resolve('next-superjson-plugin'), {}]],
                    
                },
                target: 'esnext',
                transform: { react: { runtime: 'automatic' } },
                parser: {
                    syntax: 'typescript',
                    tsx: true,
                },
                // Remove react transform since we don't want to transform React code
            },
        })
        if (process.env.DEBUG_SUPERJSON) {
            // Get relative path from pagesDir
            const relativePath = path.relative(pagesDir, this.resourcePath)
            const outputPath = path.join(
                process.cwd(),
                'superjson-plugin-outputs',
                relativePath,
            )

            // Ensure directory exists
            fs.mkdirSync(path.dirname(outputPath), { recursive: true })

            // Write transformed code to file
            fs.writeFileSync(outputPath, res.code)
        }
        callback(
            null,
            res?.code || '',
            JSON.parse(res?.map || 'null') || undefined,
        )
    } catch (e: any) {
        logger.error(e)
        callback(e)
    }
}

export type LoaderThis<Options> = {
    /**
     * Path to the file being loaded
     *
     * https://webpack.js.org/api/loaders/#thisresourcepath
     */
    resourcePath: string

    /**
     * Function to add outside file used by loader to `watch` process
     *
     * https://webpack.js.org/api/loaders/#thisadddependency
     */
    addDependency: (filepath: string) => void

    /**
     * Marks a loader result as cacheable.
     *
     * https://webpack.js.org/api/loaders/#thiscacheable
     */
    cacheable: (flag: boolean) => void

    /**
     * Marks a loader as asynchronous
     *
     * https://webpack.js.org/api/loaders/#thisasync
     */
    async: webpack.LoaderContext<any>['async']

    /**
     * Return errors, code, and sourcemaps from an asynchronous loader
     *
     * https://webpack.js.org/api/loaders/#thiscallback
     */
    callback: webpack.LoaderContext<any>['callback']
    /**
     * Loader options in Webpack 5
     *
     * https://webpack.js.org/api/loaders/#thisgetoptionsschema
     */
    getOptions: () => Options
}

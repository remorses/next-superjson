import path from 'path'

const enabled = !!process.env.DEBUG_SUPERJSON
export const logger = {
    log(...args) {
        enabled && console.log('[superjson]:', ...args)
    },
    error(...args) {
        enabled && console.log('[superjson]:', ...args)
    },
}

const filesToSkip = ([] as string[]).concat(
    ...['_document', '_error'].map((name) => [
        name + '.js',
        name + '.jsx',
        name + '.ts',
        name + '.tsx',
    ]),
)

export function shouldBeSkipped({ pagesDir, filePath }) {
    if (!filePath.includes('pages' + path.sep)) {
        return true
    }
    if (filePath.includes('pages' + path.sep + 'api' + path.sep)) {
        return true
    }
    if (filesToSkip.some((fileToSkip) => filePath.includes(fileToSkip))) {
        return true
    }
    // if outside of pagesDir, skip
    const abs = path.resolve(filePath)
    if (pagesDir && !abs.startsWith(pagesDir)) {
        console.log('skipping', abs, 'because outside of pagesDir', pagesDir)
        return true
    }

    return false
}

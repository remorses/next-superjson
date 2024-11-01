import path from 'path'

const enabled = !!process.env.DEBUG_ELACCA
export const logger = {
    log(...args) {
        enabled && console.log('[elacca]:', ...args)
    },
    error(...args) {
        enabled && console.log('[elacca]:', ...args)
    },
}

export const elaccaDirective = 'skip ssr'

const filesToSkip = ([] as string[]).concat(
    ...['_document', '_error'].map((name) => [
        name + '.js',
        name + '.jsx',
        name + '.ts',
        name + '.tsx',
    ]),
)

export function shouldBeSkipped({ pagesDir, filePath, program = null as any }) {
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
    if (!program) {
        return false
    }
    const dir = program.node.directives?.find(
        (x) => x.value?.value === elaccaDirective,
    )
    if (!dir) {
        return true
    }
    return false
}

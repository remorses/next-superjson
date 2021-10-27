const withRpc = require('next-rpc')
const { withSuperjson } = require('next-superjson')

/**@type {import('next').NextConfig} */
const config = withSuperjson()(
    withRpc({ experimentalContext: true })({
        webpack: (config, options) => {
            // console.log('isServer', options.isServer, config)
            console.log('default loaders', options.defaultLoaders)
            return config
        },
        swcMinify: true,
        experimental: {},
    }),
)

module.exports = config

const withRpc = require('next-rpc')
const { withSuperjson } = require('next-superjson')

/**@type {import('next').NextConfig} */
const config = {
    webpack: (config, options) => {
        // console.log('isServer', options.isServer, config)
        // console.log('default loaders', options.defaultLoaders)
        return config
    },
    experimental: {
        esmExternals: 'loose',
    },
    swcMinify: true,
    experimental: {},
}

module.exports = withSuperjson()(config)

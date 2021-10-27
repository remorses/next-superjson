import withRpc from 'next-rpc'
import { withSuperjson } from 'next-superjson'
console.log({ withSuperjson })

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

export default config

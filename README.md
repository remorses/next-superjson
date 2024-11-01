## Getting started

> [!IMPORTANT]
> Use https://github.com/blitz-js/next-superjson-plugin instead if you are not using a `.babelrc` file

Install the library with your package manager of choice, e.g.:

```
npm install next-superjson next-superjson-plugin superjson
```

Since this is a companion to [SuperJSON](https://github.com/blitz-js/superjson),
make sure it's also installed:


Add the plugin to your `next.config.js`.
If you don't have one, create it.

```js
const { withSuperjson } = require('next-superjson')

module.exports = withSuperjson()({})
```

> [!NOTE] Notice that you have to call the plugin function 2 times, this is to support options in the future

That's it! Now you're free to use all values and type supported by SuperJSON in your Next.js Components.

# How it works

New Nextjs 12 uses `swc` to compile user code by default, adding a custom `.babelrc` file will make Nextjs compile everything using Babel instead (much slower).

This plugin will inject the superjson babel plugin only on files under the `pages` directory so you can keep using swc for all the other files.

Version 2 of this plugin will use the SWC superjson plugin instead of the Babel plugin, this is because the previous Babel plugin no longer works, [thanks to commonjs and ESM skill issues by one of the core developers.](https://github.com/blitz-js/babel-plugin-superjson-next/issues/145#issuecomment-2452145624)

## Sponsors

[**Notaku**](https://notaku.website)

[![Notaku](https://preview.notaku.website/github_banner.jpg)](https://notaku.website)

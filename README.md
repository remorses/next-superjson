## Getting started


Install the library with your package manager of choice, e.g.:

```
npm install next-superjson next-superjson-plugin@0.6.3 superjson
```

Since this is a companion to [SuperJSON](https://github.com/blitz-js/superjson),
make sure it's also installed, also with `next-superjson-plugin`

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

This plugin will inject the superjson plugin only on files under the `pages` directory so you can keep using swc for all the other files.

Version 1 of this plugin will use the SWC superjson plugin instead of the Babel plugin, this is because the previous Babel plugin no longer works, [thanks to commonjs and ESM skill issues by one of the core developers.](https://github.com/blitz-js/babel-plugin-superjson-next/issues/145#issuecomment-2452145624)

Since version 1 this plugin also supports the `--turbo` flag.

## What is the different between this plugin and `next-superjson-plugin` SWC plugin?

`next-superjson-plugin` broke in version 15 of Next.js because SWC was updated to a version that no longer supported plugins built with a different version of `swc_core` binary. 

This plugin instead freezes the version of `@swc/core` to one that is guaranteed to work.

## Sponsors

[**Notaku**](https://notaku.website)

[![Notaku](https://preview.notaku.website/github_banner.jpg)](https://notaku.website)

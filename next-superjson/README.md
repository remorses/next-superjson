## Getting started

Install the library with your package manager of choice, e.g.:

```
npm install next-superjson
```

Since this is a companion to [SuperJSON](https://github.com/blitz-js/superjson),
make sure it's also installed:

```
npm install superjson
```

Add the plugin to your `next.config.js`.
If you don't have one, create it.

```js
const { withSuperjson } = require('next-superjson')

module.exports = withSuperjson()({})
```

That's it! Now you're free to use all values and type supported by SuperJSON in your Next.js Components.

# How it works

New Nextjs 12 uses `swc` to compile user code by default, adding a custom `.babelrc` file will make Nextjs compile everything using Babel instead (much slower).

This plugin will inject the superjson babel plugin only on files under the `pages` directory so you can keep using swc for all the other files.

## Sponsors

[**Notaku**](https://notaku.website)

[![Notaku](https://preview.notaku.website/github_banner.jpg)](https://notaku.website)

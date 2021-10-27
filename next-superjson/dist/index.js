"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSuperjson = void 0;
var find_pages_dir_1 = require("next/dist/lib/find-pages-dir");
function withSuperjson(withSuperjson) {
    if (withSuperjson === void 0) { withSuperjson = {}; }
    return function (nextConfig) {
        if (nextConfig === void 0) { nextConfig = {}; }
        return __assign(__assign({}, nextConfig), { webpack: function (config, options) {
                var _a = withSuperjson;
                var isServer = options.isServer, dev = options.dev, dir = options.dir;
                var pagesDir = (0, find_pages_dir_1.findPagesDir)(dir);
                config.module = config.module || {};
                config.module.rules = config.module.rules || [];
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
                                        require.resolve('babel-plugin-superjson-next'),
                                        {},
                                    ],
                                    require.resolve('@babel/plugin-syntax-jsx'),
                                    [
                                        require.resolve('@babel/plugin-syntax-typescript'),
                                        { isTSX: true },
                                    ],
                                ],
                            },
                        },
                    ],
                });
                if (typeof nextConfig.webpack === 'function') {
                    return nextConfig.webpack(config, options);
                }
                else {
                    return config;
                }
            } });
    };
}
exports.withSuperjson = withSuperjson;
//# sourceMappingURL=index.js.map
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const resolve = filepath => path.resolve(__dirname, filepath);

const ENABLE_SSR = process.env.VUE_APP_MODE === 'ssr';
const PRODUCTION = process.env.NODE_ENV == 'production';

module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      '': {
        target: process.env.VUE_APP_API_BASE_URL,
        secure: false,
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.use('url-loader').loader('url-loader');

    // Treat urls passed to headerIcon as imports
    config
      .module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.transformAssetUrls = { SidebarPanel: ['headerIcon'] };
        return options;
      });

    config
      .entry('app')
      .clear()
      .add('./src/entry-client.ts')
      .end();

    // Derived from https://github.com/jonaskuske/vue-cli-ssr-hmr/blob/7bbb21105c6df964feed158c61a6c546a6741f49/vue.config.js
    // (Original license: MIT)
    if (ENABLE_SSR) {
      // This has to go here so that it gets reevaluated each time the server generates the config, it
      // will use the current VUE_APP_ENV, since vue.config.json only gets evaluated once since it's `require()`ed
      const IS_SERVER_BUILD = process.env.VUE_APP_ENV === 'server';

      config.plugins
        // Delete plugins that are unnecessary/broken in SSR & add Vue SSR plugin
        .delete('html')
        .delete('preload')
        .delete('prefetch')
        .delete('pwa')
        .end()
        .plugin('vue-ssr')
        .use(IS_SERVER_BUILD ? VueSSRServerPlugin : VueSSRClientPlugin)
        .end()
        .devtool('source-map');

      if (!IS_SERVER_BUILD && !PRODUCTION) {
        config.plugin('hmr').use(webpack.HotModuleReplacementPlugin);
      }

      if (IS_SERVER_BUILD) {
        config
          // Configure the server-side build that's run in a Node environment
          .entry('app')
          .clear()
          .add('./src/entry-server.ts')
          .end()
          .target('node')
          .devtool('source-map')
          .externals(nodeExternals({ whitelist: [/\.css$/, /^vue-bootstrap-breakpoint-indicator/] }))
          .output.filename('server-bundle.js')
          .libraryTarget('commonjs2')
          .end()
          .optimization.splitChunks({})
          .end()
          .plugins.delete('named-chunks')
          .delete('hmr')
          .delete('workbox');

        // Change caching directories so client- and server-side webpack instances
        // don't share one cache – otherwise the client build would use cached SSR
        // code (and vice versa) and break thye build in some cases.
        config.module
          .rule('vue')
          .use('cache-loader')
          .tap(cacheConfig => ({
            ...cacheConfig,
            cacheDirectory: resolve(
              './node_modules/.cache/server-bundle/vue-loader',
            ),
          }))
          .end()
          .use('vue-loader')
          .tap(loaderConfig => ({
            ...loaderConfig,
            cacheDirectory: resolve(
              './node_modules/.cache/server-bundle/vue-loader',
            ),
          }))
          .end()
          .end()
          .rule('js')
          .use('cache-loader')
          .tap(cacheConfig => ({
            ...cacheConfig,
            cacheDirectory: resolve(
              './node_modules/.cache/server-bundle/babel-loader',
            ),
          }));
      }
    }
  },
  css: {
    sourceMap: true,
    extract: false,
  },
};

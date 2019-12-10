const path = require('path');

const loader = {
  loader: 'sass-resources-loader',
  options: {
    resources: path.resolve(__dirname, './src/styles/global.scss'),
  },
};
console.log(loader.options.resources);

module.exports = {
  lintOnSave: true,
  devServer: {
    public: 'http://refresh.eternadev.org',
    proxy: {
      '': {
        target: 'http://refresh.eternadev.org',
        secure: false,
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
        // pathRewrite: { '^/api': '' },
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.use('url-loader').loader('url-loader');
  },
  css: {
    sourceMap: true,
    extract: false,
  },
  // configureWebpack: {
  //   module: {
  //     rules: [
  //       {
  //         test: /\.scss$/,
  //         use: [
  //           loader,
  //           'sass-loader',
  //         ],
  //       },
  //     ],
  //   },
  // },
};

const path = require('path');

module.exports = {
  lintOnSave: true,
  devServer: {
    public: 'http://refresh.eternadev.org',
    proxy: {
      '': {
        target: 'http://refresh.eternadev.org',
        secure: false,
        changeOrigin: true,
        cookieDomainRewrite: 'refresh.localhost',
        // pathRewrite: { '^/api': '' },
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.use('url-loader').loader('url-loader');
  },
};

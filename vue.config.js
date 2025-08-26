const webpack = require('webpack');

module.exports = {
  transpileDependencies: ['birpc'],
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false', // disable hydration mismatch debug in prod
        __VUE_OPTIONS_API__: 'true', // keep Options API enabled
        __VUE_PROD_DEVTOOLS__: 'false', // disable devtools in prod
      }),
    ],
  },
};

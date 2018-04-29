const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = merge({}, commonConfig, {
  entry: [
    require.resolve('webpack-dev-server/client') + '?/',
    require.resolve('webpack/hot/dev-server'),
    commonConfig.entry,
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'development',
});

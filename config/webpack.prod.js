const path = require('path');

const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = merge({}, commonConfig, {
  output: {
    path: path.resolve(__dirname, '..', 'build'),
  },
  mode: 'production',
});

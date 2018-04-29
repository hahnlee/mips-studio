const path = require('path');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const devConfig = require('../config/webpack.dev');

const PORT = 3000;

const compiler =  webpack(devConfig);

const devServerConfig = {
  contentBase: path.resolve(__dirname, '..', 'out'),
  compress: true,
  port: PORT,
  hot: true,
  inline: true,
};

const devServer = new WebpackDevServer(
  compiler, devServerConfig,
);

devServer.listen(PORT, 'localhost', err => {
  if (err) {
    console.log(err);
    process.exit(1);
    return;
  }

  console.log(`Server running at http://localhost:${PORT}`);
});
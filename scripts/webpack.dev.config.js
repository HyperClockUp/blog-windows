const path = require('path');
const Webpackbar = require('webpackbar');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const { PROJECT_PATH, SERVER_HOST, SERVER_PORT } = require('./CONSTANT');


module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  target: 'web',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(PROJECT_PATH, './dist'),
    publicPath: '/',
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    compress: true,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [new Webpackbar()]
})
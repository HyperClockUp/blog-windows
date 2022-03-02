const { merge } = require('webpack-merge');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');
const { PROJECT_PATH } = require('./CONSTANT');
const path = require('path');


module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  target: 'browserslist',
  devtool: false,
  output: {
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
    path: path.resolve(PROJECT_PATH, './dist'),
    assetModuleFilename: 'assets/[name].[contenthash:8].[ext]',
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [
      new CSSMinimizerPlugin(),
      new TerserPlugin({
        // extractComments: false,
        terserOptions: {
          // compress: { pure_funcs: ['console.log'] },
        }
      }),
    ]
  }
});
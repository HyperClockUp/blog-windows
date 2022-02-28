const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Webpack = require('webpack');
const { PROJECT_PATH, isDevelopment, isProduction } = require('./CONSTANT');

const getCSSLoaders = () => {
  const loaders = [];
  loaders.push(
    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: "[name]__[local]__[hash:base64:5]",
          mode: (resourcePath) => {
            if (/pure.css$/i.test(resourcePath)) {
              return "pure";
            }

            if (/global.css$/i.test(resourcePath)) {
              return "global";
            }

            return "local";
          },
        },
        sourceMap: isDevelopment,
      }
    }
  );

  loaders.push({
    loader: 'postcss-loader',
    options: isProduction ? {
      postcssOptions: {
        plugins: [
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true
              }
            }
          ]
        ]
      }
    } : undefined
  });

  return loaders;
};

module.exports = {
  entry: {
    index: path.resolve(PROJECT_PATH, './index.tsx')
  },
  output: {
    path: path.resolve(PROJECT_PATH, './dist'),
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [...getCSSLoaders()],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          ...getCSSLoaders(),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            }
          }
        ]
      },
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true, plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean) },
        exclude: /node_modules/,
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|md?)$/,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React Windows",
      template: path.resolve(PROJECT_PATH, './public', './index.html')
    }),
    new CopyPlugin({
      patterns: [{
        from: "*",
        to: path.resolve(PROJECT_PATH, './dist/public'),
        globOptions: {
          dot: true,
          gitignore: true,
          ignore: ["**/index.html"],
        },
      }, ],
      options: {
        concurrency: 100,
      },
    }),
    new CleanWebpackPlugin(),
  ],
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    modules: [PROJECT_PATH, 'node_modules'],
  },
};
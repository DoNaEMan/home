const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { rules, plugins, optimization } = require('./base');

const config = {
  entry: {
    index: ['@babel/polyfill', path.resolve(__dirname, '../client/index.js')],
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]__[hash:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
          'less-loader',
        ],
      },
      ...rules
    ],
  },
  plugins: [
    ...plugins,
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new LoadablePlugin({
      filename: '../dist/loadable-stats.json',
      writeToDisk: true,
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.(scss|less|css)$/g,
    }),
  ],
  optimization,
  mode: 'production',
};

module.exports = config;

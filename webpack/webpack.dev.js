/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { rules, plugins, optimization } = require('./base');

const config = {
  entry: {
    index: ['@babel/polyfill', 'webpack-hot-middleware/client?reload=true', path.resolve(__dirname, '../client/index.js')],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devtool: 'inline-source-map',
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
              localIdentName: '[path][name]__[local]',
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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new LoadablePlugin({
      filename: path.resolve(__dirname, '../dist/loadable-stats.json'),
      writeToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin({
      alwaysWriteToDisk: true
    }),
    new WebpackBar(),
  ],
  optimization,
  mode: 'development',
};

module.exports = config;

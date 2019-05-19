const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = {
  rules: [
    {
      test: /\.html$/,
      loader: 'html-loader',
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../template/index.html'),
      filename: path.resolve(__dirname, '../client/index.html'),
      inject: false,
      title: 'demo',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendors1: {
          test: /node_modules/,
          priority: 10,
          name: 'vendors1'
        },
        vendors2: {
          test: /[\\/]node_modules[\\/]react-dom[\\/]/,
          priority: 100,
          name: 'vendors2'
        },
      }
    },
  }
};

if (process.env.ANALYZER) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  base.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = base;
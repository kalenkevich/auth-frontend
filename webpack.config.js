const path = require('path');
const webpackConfig = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const isProductionMode = nodeEnv === 'production';
const globals = {
    ENVIRONMENT: JSON.stringify(nodeEnv || 'local'),
};

module.exports = {
  entry: {
    application: './src/index.js',
  },
  target: 'web',
  context: path.resolve(__dirname, ''),
  resolve: { extensions: ['.js', '.jsx'] },
  mode: isProductionMode ? 'production' : 'development',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  devServer: {
    contentBase: './src',
    hot: true,
    historyApiFallback: true,
    port: 8082,
    stats: {
      version: true,
      timings: true,
      errors: true,
      warnings: true,
    },
  },
  module: {
    rules: [{
      test: /\.js(x?)$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.(png|jpg|gif|svg)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      }],
    }],
  },
  plugins: [
    new webpackConfig.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({
      hash: true,
      template: './public/index.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpackConfig.DefinePlugin({
      ...globals,
      'process.env': JSON.stringify(process.env),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

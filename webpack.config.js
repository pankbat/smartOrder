const path = require('path');

const ExtractTextPlugin       = require('extract-text-webpack-plugin');
const ExtractTextPluginConfig = new ExtractTextPlugin('bundle.css')

const HtmlWebpackPlugin       = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject  : 'body'
});

module.exports = {
  entry  : './client/index.js',

  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },

  // Resolve the `./src` directory so we can avoid writing
  // ../../styles/base.css
  // resolve: {
  //   modulesDirectories: ['node_modules', './client'],
  //   extensions: ['', '.js', '.jsx']
  // },

  // Instruct webpack how to handle each file type that it might encounter
  module: {
    loaders:[
      { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader') },
      { test: /\.(png|jpg)$/, loader: 'file-loader?name=images/[name].[ext]' },
      { test: /\.woff$/, loader: 'file-loader?name=fonts/[name].[ext]' }
    ]
  },

  devServer: {
    contentBase: "./dist"
  },

  // This plugin moves all the CSS into a separate stylesheet
  plugins: [ ExtractTextPluginConfig, HtmlWebpackPluginConfig]
};
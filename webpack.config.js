// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/test-page.js',
  output: {
    filename: 'add-to-homescreen.min.js',
    library: 'AddToHomescreen',
    libraryExport: 'default',
    libraryTarget: 'window',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'head',
    }),
    new MiniCssExtractPlugin({
      filename: 'add-to-homescreen.min.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/assets", to: "assets" }  
          ],
    })
  ],
  resolve: {
    fallback: {
      "fs": false,
      "url": false,
      "path": false
    },
  }
};

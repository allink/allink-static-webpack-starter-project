const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebPackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  entry: {
    'main': [
      path.resolve(__dirname, './src/js/app.js'),
      path.resolve(__dirname, './src/scss/style.scss')
    ],
  },
  mode: 'development',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: {
            minimize: false
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/'
    })
  ]
};

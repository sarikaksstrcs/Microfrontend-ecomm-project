const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { entry } = require('../container/webpack.config');
module.exports = {
  mode:'development',
  entry: './src/index.js',
  devServer:{
    port:8081,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'products',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductsIndex':'./src/index'
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}  
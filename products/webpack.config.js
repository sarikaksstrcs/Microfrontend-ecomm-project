const HtmlWebpackPlugin_PC = require('html-webpack-plugin');
const ModuleFederationPlugin_PC = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3001,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    publicPath: 'http://localhost:3001/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin_PC({
      name: 'productCatalog',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductCatalog': './src/ProductCatalog',
      },
      remotes: {
        shared: 'shared@http://localhost:3004/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
        'lucide-react': { singleton: true },
      },
    }),
    new HtmlWebpackPlugin_PC({
      template: './public/index.html',
    }),
  ],
};

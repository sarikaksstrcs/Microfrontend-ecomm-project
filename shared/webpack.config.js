const ModuleFederationPlugin_Shared = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3004,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    publicPath: 'http://localhost:3004/',
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
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin_Shared({
      name: 'shared',
      filename: 'remoteEntry.js',
      exposes: {
        './eventBus': './src/eventBus',
        './faker': './src/faker',
      },
      shared: {},
    }),
  ],
};
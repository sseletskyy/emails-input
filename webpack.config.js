const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.ts',
    'emails-input': './src/emails-input/emails-input.ts',
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './docs',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'astroturf/css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader', 'astroturf/loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Email Input',
      template: 'src/index.html',
      favicon: 'src/favicon.ico',
    }),
  ],
};

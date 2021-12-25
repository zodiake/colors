const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    ellipse: './src/ellipse/index.ts',
    translation: './src/translation/index.ts'
  },
  output: {
    path: __dirname + '/dist',
    filename: "[name].js",
  },
  devtool: 'eval-source-map',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/images", to: "images" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
};
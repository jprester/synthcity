const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  devServer: {
    static: {
      directory: path.join(__dirname, "/"), // serve content from root
    },
    compress: true,
    port: 9000,
    client: {
      overlay: {
        warnings: false, // Do not display warnings in the browser UI
        errors: true, // Display errors
      },
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.[contenthash].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // path to your index.html file
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};

var path = require("path");

module.exports = {
  mode: "development",
  entry: "/src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
  optimization: {
    concatenateModules: true,
    minimize: false,
  },
};

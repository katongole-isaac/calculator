const { merge } = require("webpack-merge");
const webpackConfig = require("./webpack.config");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const cssRegExp = /\.css$/i;


module.exports = merge(webpackConfig, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      ...webpackConfig.module.rules,
      {
        test: cssRegExp,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin(), ...webpackConfig.plugins],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        exclude: /node_modules/,
      }),
      new CssMinimizerPlugin(),
    ],
  },
});

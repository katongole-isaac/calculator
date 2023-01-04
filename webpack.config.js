const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const yaml = require("yamljs");
const toml = require("toml");
const json5 = require("json5");
const webpack = require("webpack");

const imageRegExp = /\.(png|svg|gif|jpe?g)$/i;
const jsExtensions = ["*", ".js", ".jsx"];

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].bundle.js",
    clean: true,
  },

  resolve: {
    extensions: jsExtensions,
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: imageRegExp,
        type: "asset/resource",
      },
      {
        test: /\.(js|jsx)/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"],
        },
      },
      {
        test: /\.toml$/i,
        type: "json",
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: "json",
        parser: {
          parse: yaml.parse,
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
    }),

    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],

  optimization: {
    runtimeChunk: "single",
  },
};

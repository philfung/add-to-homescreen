// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const { LOCALES } = require(path.resolve(__dirname, "src/config"));

function createWebpackLocaleConfig(locale, preventMinification) {
  const entry = `./src/${locale ? "build/" : ""}main${
    locale ? `_${locale}` : ""
  }.ts`;

  return {
    entry,
    output: {
      filename: `add-to-homescreen${locale ? `_${locale}` : ""}${
        !!preventMinification ? "" : ".min"
      }.js`,
      path: path.resolve(__dirname, "dist"),
    },
    mode: "production",
    optimization: !!preventMinification
      ? {
          minimize: false,
          minimizer: [], // This removes all minimizers
        }
      : undefined,
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        inject: true,
        minify: false,
        filename: `${!!preventMinification ? "debug" : "index"}${
          locale ? `_${locale}` : ""
        }.html`,
      }),
      new MiniCssExtractPlugin({
        filename: "add-to-homescreen.min.css",
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: "./src/assets", to: "assets" }],
      }),
    ],
    resolve: {
      extensions: [".ts", ".js"],
      fallback: {
        fs: false,
        url: false,
        path: false,
      },
    },
  };
}

module.exports = [
  createWebpackLocaleConfig(null, false),
  createWebpackLocaleConfig(null, true),
].concat(LOCALES.map((locale) => createWebpackLocaleConfig(locale, false)));

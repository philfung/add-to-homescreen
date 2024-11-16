// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const { LOCALES } = require(path.resolve(__dirname, "src/config"));

// Get configuration from environment
const locale = process.env.LOCALE;
const preventMinification = process.env.PREVENT_MINIFICATION === 'true';

// Create single entry configuration
const entry = `./src/${locale ? "build/" : ""}main${locale ? `_${locale}` : ""}.ts`;

module.exports = {
  // Set mode based on environment
  mode: preventMinification ? "development" : "production",
  entry,
  output: {
    filename: `add-to-homescreen${locale ? `_${locale}` : ""}${preventMinification ? "" : ".min"}.js`,
    path: path.resolve(__dirname, "dist"),
    clean: false, // Don't clean output directory between builds
  },
  // Reduce memory usage
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{ 
          loader: "ts-loader",
          options: {
            transpileOnly: true, // Skip type checking
            experimentalWatchApi: true
          }
        }],
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
      filename: `${preventMinification ? "debug" : "index"}${locale ? `_${locale}` : ""}.html`,
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
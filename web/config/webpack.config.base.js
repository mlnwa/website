// webpack 公共配置文件
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: {
    app: "../src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[hash].js",
  },
  resolve: {
    extensions: [".ts", "tsx", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "blog",
      template: path.resolve(__dirname, "../index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      // babel
      { test: /\.(js|jsx)$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.(ts|tsx)$/, loader: "ts-loader", exclude: /node_modules/ },
      // 样式文件解析
      {
        test: /\.(css|scss)$/,
        exclude: /\.module\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.module\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      // 图片地址解析 webpack5 内置 assets
      {
        test:/\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
        type:"asset/resource"
      },
    ],
  },
  // 二级缓存 require 缓存失效
  cache:{
    type : 'filesystem',
    buildDependencies:{
        config:[__filename],
    },
    name:'developent-cache'
  }
};

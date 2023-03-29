// webpack 开发环境配置
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const path = require("path");

/**
 * @type {import('webpack').WebpackOptionsNormalized;}
 */
const devConfig = {
  mode: "development",
  devServer: {
    port: 8000,
    host: "localhost",
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        secure: false,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
    // contentBase:path.join(__dirname,"../public"),
    // watchContentBase:true,
    compress: true,
    historyApiFallback: true,
    hot: true,
    // clientLogLevel:'error',
    client: {
      logging: "error",
    },
    open: true, // open browser
    static: {
      watch: {
        ignored: /node_modules/,
      },
      publicPath: "/",
      directory: path.join(__dirname, "../public"),
    },
  },
};

module.exports = webpackMerge.merge(baseConfig, devConfig);

// webpack 开发环境配置
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const path = require("path");
const { DefinePlugin } = require("webpack");

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
        target: "http://localhost:3000",
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
  plugins:[
    new DefinePlugin({
      'process.env':{
        NODE_ENV:JSON.stringify('development')
      }
    })
  ]
};

module.exports = webpackMerge.merge(baseConfig, devConfig);

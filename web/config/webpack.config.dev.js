// webpack 开发环境配置
const webpackMerge = require("webpack-merge")
const baseConfig = require("./webpack.config.base")
const path = require("path")

/**
 * @type {import('webpack').WebpackOptionsNormalized;}
 */
const devConfig = {
    mode:'development',
    devServer:{
        port:3000,
        host:"localhost",
        contentBase:path.join(__dirname,"../publish"),
        watchContentBase:true,
        publicPath:'/',
        compress:true,
        historyApiFallback:true,
        hot:true,
        clientLogLevel:'error',
        // open : true,
        watchOptions:{
            ignored:'/node_modules/'
        }
    }
}

module.exports = webpackMerge.merge(baseConfig,devConfig)
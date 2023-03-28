const webpackMerge = require("webpack-merge")
const baseConfig = require("./webpack.config.base")

/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */

const prodConfig = {
    mode:"production"
}

module.exports = webpackMerge(baseConfig,prodConfig)
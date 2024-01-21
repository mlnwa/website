const webpackMerge = require("webpack-merge")
const baseConfig = require("./webpack.config.base")
const { DefinePlugin } = require("webpack")
const prodEnv = require("./prod.env")

/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */

const prodConfig = {
    mode: "production",
    plugins: [
        new DefinePlugin({
            "process.env": prodEnv
        })
    ]
}

module.exports = webpackMerge.merge(baseConfig, prodConfig)
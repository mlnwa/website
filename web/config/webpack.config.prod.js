const webpackMerge = require("webpack-merge")
const baseConfig = require("./webpack.config.base")
const { DefinePlugin } = require("webpack")

/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */

const prodConfig = {
    mode: "production",
    plugins: [
        new DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
}

module.exports = webpackMerge.merge(baseConfig, prodConfig)
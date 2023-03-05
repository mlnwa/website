const path = require('path')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry:{
        app:'../src/index.tsx'
    },
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'[name].[hash].js'
    },
    resolve:{
        extensions:['.ts','tsx','.js','.jsx']
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'blog',
            template:path.resolve(__dirname,'../index.html'),
            filename:'index.html'
        }),
        new CleanWebpackPlugin(),
    ]
}
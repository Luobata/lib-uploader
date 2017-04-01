module.exports = {
    devtool: 'source-map',

    entry:  __dirname + "/test/test.js",
    output: {
        path: __dirname + "/test/",
        filename: "bundle.js"
    },

    module: {
        loaders: [
        {
            test: /\.json$/,
            loader: "json"
        },
        {
            test: /\.css$/,
            loader: 'style!css'//添加对样式表的处理
        }
        ]
    },

    devServer: {
        contentBase: "./test/",
        port: 8889,
        colors: true,
        historyApiFallback: true,
        inline: true
    }
}

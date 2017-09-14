const
    path = require("path"),
    webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),

    release = -1 !== process.argv.indexOf("--release")
;

module.exports = {

    entry: {
        index: [
            "./src/index.js",
        ]
    },

    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "/",
    },

    resolve: {
        extensions: [
            ".js",
            ".json",
            ".mp3",
            ".ogg",
            ".mp4",
            ".svg"
        ],
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ['env']
                }
            }, {
                loader: "eslint-loader"
            }]
        }, {
            test: /\.mp3|\.ogg|\.mp4|\.svg$/,
            use: [{
                loader: "url-loader",
            }]
        }, {
            test: /\.css$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }]
        }],
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        })
    ]

    // node: {
    //     fs: 'empty'
    // }
};

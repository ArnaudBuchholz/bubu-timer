const
    path = require("path"),
    webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),

    release = -1 !== process.argv.indexOf("--release")
;

module.exports = {

    entry: {
        run: [
            "./src/run.js",
        ],
        edit: [
            "./src/edit.js",
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
            ".mp3"
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
            test: /\.mp3$/,
            use: [{
                loader: "url-loader",
            }]
        }],
    },

    plugins: []
        .concat(
            release
                ? [
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false,
                        },
                    }),
                ]
                : []
        ),

    node: {
        fs: 'empty'
    }
};

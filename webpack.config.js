const
    path = require("path"),
    webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),

    release = -1 !== process.argv.indexOf("--release")
;

module.exports = {

    entry: {
        index: [
            "./src/run.js",
        ],
    },

    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "/",
    },

    resolve: {
        extensions: [
            "",
            ".js",
            ".json",
        ],
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ["babel", "eslint"]
        }],
    },

    plugins: [],
        // .concat(
        //     release
        //         ? [
        //             new webpack.optimize.UglifyJsPlugin({
        //                 compress: {
        //                     warnings: false,
        //                 },
        //             }),
        //         ]
        //         : []
        // )

};

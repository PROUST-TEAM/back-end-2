// ./webpack.config.js
const nodeExternals = require("webpack-node-externals");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    mode: "development",
    context: __dirname + '/src',
    entry: {
        app: '../index.js',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "./swagger", to: "./swagger" }],
        }),
    ],
    module: {
        rules: [
        {
            test: /\.js$/,
            use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"],
            },
            },
            exclude: /node_modules/,
        },
        ],
    },
    target: "node",
    externalsPresets: {
        node: true,
    },
    externals: [nodeExternals()],
    };

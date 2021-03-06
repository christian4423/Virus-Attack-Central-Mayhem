const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");


module.exports = {
    entry: [
        "@babel/polyfill",
        "./src/entry-base.js",
        "./src/entry-js.js",
        "./src/entry-images.js"
    ],    
    mode: 'production',
    output: {
        path: path.join(__dirname, "/public"),
        publicPath: "/public",
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                include: [
                    path.join(__dirname, "src"),
                    path.join(__dirname, "node_modules/"),
                ],
                loader: "babel-loader",
                options: {
                    presets: [ "@babel/preset-env"],
                    plugins: ["transform-class-properties"]
                }
            },
            {
                test: /\.json$/,
                loader: "json-loader",
                exclude: [
                    path.join(__dirname, "node_modules/"),
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        limit: 500,
                        name: "./img/[name].[ext]"
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        limit: 500,
                        name: "./fonts/[name].[ext]"
                    }
                }]
            }
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, "src"),
            "bower_components",
            "node_modules",
        ],
        extensions: [
            ".js",
            ".jsx",
            ".style"
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/bundle.css"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};

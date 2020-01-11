'use strict';
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isProd = false;

module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: path.resolve(__dirname, 'lib', 'index.js'),
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'wavedrom.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['to-string-loader', 'css-loader'] // style-loader
            }
        ]
    },
    optimization: {
        minimize: isProd,
        minimizer: [new UglifyJsPlugin({
            include: /\.min\.js$/
        })]
    }
};
const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist/js/'),
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader', options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader', options: {
                            sourceMap: true
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ 
            filename: '../css/[name].bundle.css' 
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            tether: 'tether',
            Tether: 'tether',
            'window.Tether': 'tether',
            Popper: ['popper.js', 'default']
        })
    ]
});
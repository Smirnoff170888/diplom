const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = (process.env.NODE_ENV === 'development');
const isProd = (process.env.NODE_ENV === 'production');

const config = require('./config.js');

module.exports = {
    entry: {
      index: ['./src/css/index.css', './src/js/windex.js'],
      about: ['./src/css/about.css', './src/js/wabout.js'],
      analytics: ['./src/css/analytics.css', './src/js/wanalytics.js']
    },
    output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: isProd ? '/diplom/' : '/',
            filename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: { loader: "babel-loader" },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader), 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jp?g|gif|ico|svg)$/,
                use: [
                     'file-loader?name=images/[name].[ext]',
                     {
                         loader: 'image-webpack-loader',
                         options: {
                            mozjpeg: {
                              progressive: true,
                              quality: 65
                            },
                            optipng: {
                              enabled: true,
                            },
                            pngquant: {
                              quality: [0.8, 1],
                              speed: isDev ? 11 : 2
                            },
                            gifsicle: {
                              interlaced: false,
                            },
                            webp: {
                              quality: 75
                            }
                          }
                     },
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                loader: 'file-loader?name=vendor/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'config': JSON.stringify(config)
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default', {
                        discardComments: {
                            removeAll: true
                        }
                    }],
            },
            canPrint: true
       }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
                removeAttributeQuotes: isProd
              },
          }),
          new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/about.html',
            filename: 'about.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
                removeAttributeQuotes: isProd
              },
          }),
          new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/analytics.html',
            filename: 'analytics.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
                removeAttributeQuotes: isProd
              },
          }),
        new WebpackMd5Hash()
    ]
}
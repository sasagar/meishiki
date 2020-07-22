// 開発or本番モードの選択(development、production、noneのいずれか設定必須)
// development: 開発時のファイル出力のモード(最適化より時間短縮,エラー表示などを優先)
// production: 本番時のファイル出力のモード(最適化されて出力される)
const MODE = 'development';
// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === 'development';

const path = require('path');
const webpack = require('webpack');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled MiniCssExtractPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

const TerserPlugin = require('terser-webpack-plugin');

const WorkboxPlugin = require('workbox-webpack-plugin');

// manifest for PWA
const WebpackPwaManifest = require('webpack-pwa-manifest');

// Vue Loader
const { VueLoaderPlugin } = require('vue-loader');

// HTML Loader
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: MODE,
    entry: './src/js/index.js',
    output: {
        path: `${__dirname}/dist/`,
        filename: 'js/[name].js',
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({ filename: 'main.[chunkhash].css' }),
        new WorkboxPlugin.GenerateSW({
            cacheId: 'meishiki',
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: true,
            maximumFileSizeToCacheInBytes: 10240000,
            runtimeCaching: [
                {
                    urlPattern: "/",
                    handler: "NetworkFirst",
                    options: {
                        cacheName: "html",
                        expiration: {
                            maxAgeSeconds: 60 * 60,
                        },
                        matchOptions: {
                            ignoreSearch: true,
                        }
                    }
                },
                {
                    urlPattern: /js\/[^\/\.]+\.js$/,
                    handler: "NetworkFirst",
                    options: {
                        cacheName: "mainJs",
                        expiration: {
                            maxAgeSeconds: 60 * 60,
                        },
                        matchOptions: {
                            ignoreSearch: true,
                        }
                    }
                }
            ],
        }),
        new WebpackPwaManifest({
            short_name: "命式計算",
            name: "PWA版 命式計算機",
            display: "standalone",
            start_url: ".",
            Scope: "/",
            ios: true,
            crossorigin: 'use-credentials',
            includeDirectory: true,
            icons: [{
                src: path.resolve("src/images/icon.png"),
                sizes: [120, 152, 167, 180, 1024],
                destination: path.join('icons', 'ios'),
                ios: true
            },
            {
                src: path.resolve("src/images/icon1024.png"),
                sizes: 1024,
                destination: path.join('icons', 'ios'),
                ios: 'startup'
            }]
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
        }),
    ],

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /.(js|jsx)$/,
                include: [],
                loader: 'babel-loader',
                // Babel options
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
            {
                test: /.(scss|css)$/,

                use: [
                    // {
                    // 	loader: MiniCssExtractPlugin.loader
                    // },
                    {
                        loader: 'style-loader',
                    },
                    // {
                    // 	loader: 'vue-style-loader'
                    // },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: enabledSourceMap,
                            url: false,
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: enabledSourceMap,
                        },
                    },
                ],
            },
        ],
    },

    optimization: {
        minimizer: [new TerserPlugin()],

        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/,
                },
            },

            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: true,
        },
    },

    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
        },
        extensions: ['*', '.js', '.vue', '.json'],
    },

    devServer: {
        contentBase: 'dist',
        open: true,
    },
};

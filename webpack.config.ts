import path from 'path';
import { Configuration } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import DotenvWebpackPlugin from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const PORT = Number(process.env.WEBPACK_PORT) || 3000;
const isDev = process.env.NODE_ENV === 'development';

const config: Configuration = {
    entry: './src/index.tsx',
    plugins: [
        new DotenvWebpackPlugin({
            systemvars: true,
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            eslint: {
                files: path.resolve(__dirname, 'src/**/*.{ts,tsx,js,jsx}'),
            },
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'build/index.html'),
            template: path.resolve(__dirname, 'index.html'),
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'build'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
        }),
    ],
    devServer: {
        publicPath: '/',
        port: PORT,
        hot: isDev,
    },
    devtool: isDev ? 'source-map' : '',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript',
                        ],
                    },
                },
            },
            {
                test: /\.module.(s[ac]ss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]_[hash:base64]',
                            },
                            sourceMap: isDev,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev,
                        },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/,
                exclude: /\.module.(s[ac]ss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader'],
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss', '.jpg'],
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
        },
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
};

export default config;

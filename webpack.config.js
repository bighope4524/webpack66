const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/scripts/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'scripts/[name]-[contenthash].js',
        publicPath: '/',
    },
    devServer: {
        static: path.resolve(__dirname, 'src'),
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.js|jsx/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {'targets': '> 0.25%, not dead'}],
                                '@babel/preset-react',
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(css|sass|scss)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: false,
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|svg)/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name]-[contenthash][ext]',
                },
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.pug/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './styles/[name]-[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        // new HtmlWebpackPlugin({
        //     template: './src/templates/access.pug',
        //     filename: 'access.html'
        // }),
        // new HtmlWebpackPlugin({
        //     template: './src/templates/members/taro.pug',
        //     filename: 'members/taro.html'
        // }),
        new CleanWebpackPlugin(),
    ],
}

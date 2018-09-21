const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (environment) => {

    const env = dotenv.config({path: environment.ENV}).parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {

        entry: './index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js',
            //publicPath: JSON.parse(envKeys.BASE_URL),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.bundle\.js$/,
                    use: 'bundle-loader'
                },
                {
                    test: /\.html$/,
                    use: ['html-loader']
                },
                {
                    test: /\.css$/, use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']
                },
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            }),
            new webpack.DefinePlugin({
                "process.env.Config": envKeys
            })
        ]
    }
}
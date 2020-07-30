// eslint-disable-next-line import/order
const path = require('path')
const slsw = require('serverless-webpack')
const webpack = require('webpack')

module.exports = {
    entry: slsw.lib.entries,
    target: 'node',
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: __dirname,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, '.webpack'),
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
}

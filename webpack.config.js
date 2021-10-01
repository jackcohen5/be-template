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
                test: /\.ts?$/,
                include: __dirname,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    output: {
        filename: '[name].js',
        library: {
            type: 'commonjs',
        },
        path: path.resolve(__dirname, '.webpack'),
    },
    plugins: [new webpack.ProgressPlugin()],
}

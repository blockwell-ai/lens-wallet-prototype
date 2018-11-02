const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './node_modules/am-lens-wallet/frontend/js/app.js',
        custom: './public-src/js/custom.js'
    },
    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /(node_modules)/, loader: "babel-loader"}
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    stats: {
        colors: true
    },
    performance: {
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000
    },
    devtool: 'source-map'
};

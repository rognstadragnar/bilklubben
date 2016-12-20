var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        path.join(__dirname, './client/assets/scripts/main.js')
    ],
    output: {
        path: path.join(__dirname, './client/assets/scripts/'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, 'client'),
                ],
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
    		new webpack.optimize.DedupePlugin(), //dedupe similar code 
				new webpack.optimize.UglifyJsPlugin(), //minify everything
				new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks 
    ],
    resolve: {
        extensions: [ '', '.js', '.jsx']
    },
}

var path = require('path');
var webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    //watch: true,
    //devtools: 'eval-source-map',
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
        //new LiveReloadPlugin(),        
    ],
    resolve: {
        extensions: [ '', '.js']
    },
}

const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'public/js'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015','react','stage-2'],
                        plugins: ['react-html-attrs','transform-class-properties']
                    }
                }
            }
        ]
    },
    devtool: 'source-map',
    mode: 'development'
};
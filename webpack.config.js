const path = require('path');

module.exports = {

    entry: './src/web/index.ts',

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'website')
    }
}
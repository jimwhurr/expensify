const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// the rules section includes elements that have regular expressions, these are
//  /\.js$/  - test that the file ends (the $) with . (escaped \) js
//  /node_modules/ - exclude the node_modules folder

// the presets for babel are set by create the file .babelrc (in the root folder of the project).
// it includes the equivalent of the arguments previously passed to bable via the cli.
//  

// Note: "disableHostCheck: true" added to dev-server to workaround bug #1608

module.exports = (env) => {

    const isProduction = (env === 'production');
    // const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: /*'./src/playground/hoc.js',*/  './src/app.js',
        output: {
            path: path.join(__dirname,'public'),
            filename: 'bundle.js'
        },
        mode: 'development',
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true }
                        }                            
                    ]
                }
            ]
        },
        plugins: [new MiniCssExtractPlugin({ filename: 'styles.css' })],
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname,'public'),
            historyApiFallback: true,
            disableHostCheck: true
        }
    };
};

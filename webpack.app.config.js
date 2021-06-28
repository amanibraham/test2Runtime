const path = require('path');
const serveStatic = require('serve-static');
const finalHandler = require('finalhandler');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'app': path.join(process.cwd(), './src/main.ts'),
        'vendors': path.join(process.cwd(), './src/vendors.ts')
    },

    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: [
            '.ts',
            '.js'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            chunksSortMode: 'manual',
            chunks: []
        }),
    ],
    devServer: {
        before(app) {
            //const serveExtensionStatic = serveStatic(path.join(process.cwd(), '../extension/dist'));
            const serveExtensionStatic = serveStatic(path.join(process.cwd(), 'https://braam1.upv.edu.es/Angular_comp'));
            app.use((req, res, next) => {
                console.log(req.url);
                if (req.url.includes('https://braam1.upv.edu.es/Angular_comp/a.module.js')) {
              // if (req.url.includes('/a.module.js')) {
                    console.log(req.url);
                    serveExtensionStatic(req, res, finalHandler(req, res));
                } else {
                    next();
                }
            });
        }
    }
};
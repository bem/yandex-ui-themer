const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
    const outputDir = path.join(
        __dirname,
        argv.mode === 'production' ? '../plugin-static' : 'dist'
    );
    const publicPath =
        argv.mode === 'production'
            ? 'themer-url/'
            : '/';

    const frameUrl =
        argv.mode === 'production'
            ? publicPath
            : 'http://localhost:3000/?figma=true';

    return {
        mode: argv.mode === 'production' ? 'production' : 'development',

        // This is necessary because Figma's 'eval' works differently than normal eval
        devtool: argv.mode === 'production' ? false : 'inline-source-map',

        entry: {
            figma: './src/figma.ts', // The entry point for your plugin code
        },

        module: {
            rules: [
                // Converts TypeScript code to JavaScript
                { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },

                // Enables including CSS by doing "import './file.css'" in your TypeScript code
                {
                    test: /\.css$/,
                    use: ['style-loader', { loader: 'css-loader' }],
                },

                // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
                { test: /\.(png|jpg|gif|webp|svg)$/, loader: 'url-loader' },
            ],
        },

        // Webpack tries these extensions for you if you omit the extension like "import './file'"
        resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

        output: {
            filename: 'figma/[name].js',
            path: outputDir, // Compile into a folder called "dist"
            publicPath,
        },
        // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/ui.html',
                filename: 'figma/index.html',
                inlineSource: '.(js)$',
                chunks: ['ui'],
                templateParameters: { frameUrl },
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: 'src/manifest.json',
                        to: path.join(outputDir, 'figma', 'manifest.json'),
                    },
                ],
            }),
            // argv.mode === 'production' && new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
        ].filter(Boolean),
    };
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        entry: path.resolve(__dirname, "src/main.tsx"),
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: isProduction ? "assets/[name].[contenthash].js" : "assets/[name].js",
            publicPath: "/",
            clean: true,
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                        },
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: [isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "index.html"),
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "public"),
                        to: path.resolve(__dirname, "dist"),
                        noErrorOnMissing: true,
                    },
                ],
            }),
            ...(isProduction ? [new MiniCssExtractPlugin({ filename: "assets/[name].[contenthash].css" })] : []),
        ],
        devServer: {
            static: path.resolve(__dirname, "public"),
            historyApiFallback: true,
            hot: true,
            port: 5173,
        },
        devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
        performance: {
            hints: false,
        },
    };
};

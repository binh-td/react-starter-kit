const path = require("path");
const webpack = require("webpack")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin")

const isServe = process.env.SERVE
let mode = "development";
let target = "web";

const plugins = [
  new HtmlWebpackPlugin({
    template: "public/index.html"
  }),
  new CopyPlugin({
    patterns: [
      {
        from: "**/*",
        globOptions: {
          ignore: ["**/index.html"]
        },
        to: "",
        context: path.resolve(__dirname, "public")
      }
    ]
  }),
  new MiniCssExtractPlugin({
    filename: isServe ? "[name].css" : "static/css/[name].[contenthash:6].css"
  }),
  new ReactRefreshWebpackPlugin(),
  new webpack.ProgressPlugin()
];

if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

if (!isServe) {
  // Serve mode
  plugins.push(new CleanWebpackPlugin());
  plugins.push(new CompressionPlugin({
    test: /\.(css|js|html|svg)$/
  }))
}

module.exports = {
  // mode defaults to 'production' if not set
  mode: mode,

  // This is unnecessary in Webpack 5, because it's the default.
  // However, react-refresh-webpack-plugin can't find the entry without it.
  entry: "./src/index.js",

  output: {
    // output path is required for `clean-webpack-plugin`
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    // this places all images processed in an image folder
    filename: "static/js/main.[contenthash:6].js",
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false
    },
    // assetModuleFilename: "images/[hash][ext][query]",
  },

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // This is required for asset imports in CSS, such as url()
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          // according to the docs, sass-loader should be at the bottom, which
          // loads it first to avoid prefixes in your sourcemaps and other issues.
          "sass-loader",
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        type: "asset",
        generator: {
          filename: isServe
          ? "[path][name].[ext]"
          : "static/media/[name].[contenthash:6].[ext]"
        }

        /**
         * If you want to inline larger images, you can set
         * a custom `maxSize` for inline like so:
         */
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 30 * 1024,
        //   },
        // },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          // without additional settings, this will reference .babelrc
          loader: "babel-loader",
          options: {
            /**
             * From the docs: When set, the given directory will be used
             * to cache the results of the loader. Future webpack builds
             * will attempt to read from the cache to avoid needing to run
             * the potentially expensive Babel recompilation process on each run.
             */
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  plugins: plugins,

  target: target,

  devtool: isServe ? "source-map" : false,

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ["*", ".js", ".jsx"],
    alias: {
      "@": path.resolve("src"),
      "@@": path.resolve()
    }
  },

  // required if using webpack-dev-server
  devServer: {
    contentBase: "public",
    port: 8000,
    hot: true,
    watchContentBase: true,
    historyApiFallback: true,
    open: true
  },
  performance: {
    maxEntrypointSize: 800000 
  }
};

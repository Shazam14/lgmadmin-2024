const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const isSecure = process.env.USE_SECURE_WS === "true";
const wsProtocol = isSecure ? "wss" : "ws";
const wsHostname = isSecure
  ? "testlgms.learninggardenmontessori.ph"
  : "192.168.1.2";

console.log("USE_SECURE_WS:", process.env.USE_SECURE_WS);
console.log("WebSocket Protocol:", wsProtocol);
console.log("WebSocket Hostname:", wsHostname);

// Convert environment variables to an object that can be used by DefinePlugin

module.exports = {
  mode: "development", // Set to "production" for production builds
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    devtoolModuleFilenameTemplate: (info) =>
      `webpack:///${info.resourcePath.replace(/^\.\//, "")}`,
    devtoolFallbackModuleFilenameTemplate: (info) =>
      `webpack:///${info.resourcePath.replace(/^\.\//, "")}`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name].[hash][ext]",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name].[hash][ext]",
        },
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 3007,
    historyApiFallback: {
      index: "/index.html",
    },
    allowedHosts: "all", // Allow all hosts
    host: "0.0.0.0", // Ensure the server listens on all IPs
    client: {
      webSocketURL: {
        protocol: wsProtocol,
        hostname: wsHostname,
        port: "3007",
        pathname: "/ws",
      },
    },
    headers: {
      "Content-Security-Policy": `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' ${wsProtocol}://${wsHostname}:3007 https://fonts.gstatic.com; font-src 'self' https://fonts.gstatic.com;`,
    },
    setupMiddlewares: (middlewares, devServer) => {
      middlewares.unshift((req, res, next) => {
        console.log("Before setup middleware");
        next();
      });

      middlewares.push((req, res, next) => {
        console.log("After setup middleware");
        next();
      });

      return middlewares;
    },
  },
};

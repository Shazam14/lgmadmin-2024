const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

// Load environment variables from .env file
dotenv.config();
console.log("GETTING PROCESS ENVIRONMENT", process.env);

const isSecure = process.env.USE_SECURE_WS === "true";
const wsProtocol = isSecure ? "wss" : "ws";
const wsHostname = isSecure
  ? "testlgms.learninggardenmontessori.ph"
  : "192.168.1.2";

console.log("USE_SECURE_WS:", process.env.USE_SECURE_WS);
console.log("WebSocket Protocol:", wsProtocol);
console.log("WebSocket Hostname:", wsHostname);

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/", // Ensure this is set to root
    devtoolModuleFilenameTemplate: (info) =>
      `webpack:///${info.resourcePath.replace(/^\.\//, "")}`,
    devtoolFallbackModuleFilenameTemplate: (info) =>
      `webpack:///${info.resourcePath.replace(/^\.\//, "")}`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
    new WebpackManifestPlugin({
      fileName: "manifest.json",
      publicPath: "/",
      generate: (seed, files, entrypoints) => {
        const manifest = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        console.log("Manifest generated:", manifest);
        return manifest;
      },
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
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.botpress.cloud; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' " +
        wsProtocol +
        "://" +
        wsHostname +
        ":3007 https://fonts.gstatic.com http://192.168.1.2:8001 https://testadmin.learninggardenmontessori.ph; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data:; manifest-src 'self';",
    },
    setupMiddlewares: (middlewares, devServer) => {
      middlewares.unshift((req, res, next) => {
        console.log("Before setup middleware");
        console.log(`Request URL: ${req.url}`);
        next();
      });

      middlewares.push((req, res, next) => {
        console.log("After setup middleware");
        if (req.url.includes("manifest.json")) {
          console.log("Manifest JSON requested");
        }
        next();
      });

      return middlewares;
    },
  },
};

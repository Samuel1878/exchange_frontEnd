// //  plugins: [
// //     new CopyPlugin({
// //       patterns: [
// //         { from: "src/index.html", to: "" },
// //         { from: "node_modules/scichart/_wasm/scichart2d.wasm", to: "" },
// //       ],
// //     })
// //   ]
// // const path = require("path");
// // const CopyPlugin = require("copy-webpack-plugin");
// // const webpack = require("webpack");
// import path from "path";
// import CopyPlugin from "copy-webpack-plugin";
// import { webpack } from "webpack";
// module.exports = {
//   mode: "production",
//   entry: "./app/root.jsx",
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//       //   use: {
//       //     loader: "babel-loader",
//       //   },
//       },
//     ],
//   },
//   resolve: {
//     extensions: [".js", ".jsx"],
//   },
//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "build"),
//   },
//   plugins: [
//     new CopyPlugin({
//       patterns: [
//         { from: "application/wasm", to: "" },
//         // Required for scichart to load wasm and data files for 2D charts
//         // Loading from CDN is also possible by calling SciChartSurface.loadWasmFromCDN()
//         { from: "node_modules/scichart/_wasm/scichart2d.data", to: "" },
//         { from: "node_modules/scichart/_wasm/scichart2d.wasm", to: "" },

//       ],
//     }),
//   ],
//   devServer: {
//     client: {
//       overlay: {
//         warnings: false,
//         errors: true,
//       },
//     },
//   },
// };
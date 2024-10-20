"use strict";

/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  // Add babel-loader for ES modules support
  config.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-transform-modules-commonjs"],
      },
    },
  });

  // Return the modified config
  return config;
};

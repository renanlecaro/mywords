const preactCliSvgLoader = require("preact-cli-svg-loader");
const webpack = require("webpack");

export default {
  webpack(config, env, helpers, options) {
    // config.node.process = "mock";
    preactCliSvgLoader(config, helpers);

    config.plugins.push(new webpack.DefinePlugin(process.env));
  },
};

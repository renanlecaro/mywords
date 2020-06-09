const preactCliSvgLoader = require("preact-cli-svg-loader");

export default {
  webpack(config, env, helpers, options) {
    config.node.process = "mock";
    preactCliSvgLoader(config, helpers);
  },
};

const preactCliSvgLoader = require("preact-cli-svg-loader");

export default {
  webpack(config, env, helpers, options) {
    preactCliSvgLoader(config, helpers);
  },
};

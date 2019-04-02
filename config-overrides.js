var path = require('path');
var webpack = require('webpack');

module.exports = (config, env) => {
  return {
    ...config,
    externals: {
      'Config': JSON.stringify(require(`./config/config.${process.env.ENV}.json`))
    }
  };
}
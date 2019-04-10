var path = require('path');
var webpack = require('webpack');

module.exports = (config, env) => {

  return {
    ...config,
    // output: {
    //   ...config.output,
    //   path: '/Users/buimarcus/data/dev/labs/egopulse/netdata-dashboard/build/dashboard',
    //   publicPath: "/dashboard"
    // },
    externals: {
      'Config': JSON.stringify(require(`./config/config.${process.env.ENV}.json`))
    }
  };
}
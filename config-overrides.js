var path = require('path');
var webpack = require('webpack');

module.exports = (config, env) => {

  console.log(`=============================================`)
  console.log(`${process.env.ENV}`)
  console.log(`${process.env.REACT_APP_NETDATA_SERVER}`)
  console.log(`${process.env.CONFIG_PATH}`)

  const configPath = process.env.CONFIG_PATH || `./config/config.${process.env.ENV}.json`;
  console.log(`${configPath}`)
  console.log(`=============================================`)

  return {
    ...config,
    // output: {
    //   ...config.output,
    //   path: '/Users/buimarcus/data/dev/labs/egopulse/netdata-dashboard/build/dashboard',
    //   publicPath: "/dashboard"
    // },
    externals: {
      'Config': JSON.stringify(require(configPath))
    }
  };
}
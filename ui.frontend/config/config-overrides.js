const { ReactLoadablePlugin } = require('react-loadable/webpack');

module.exports = {
  webpack: function (config, env) {
    config.plugins.push(
      new ReactLoadablePlugin({
        filename: './build/react-loadable.json',
      }),
    );
    return config;
  },
};

const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  config.devServer = {
    proxy: {
      '/api': 'http://127.0.0.1:5000'
    }
  }

  return config;
};

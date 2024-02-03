const { ModuleFederationPlugin } = require("webpack").container;

module.exports = function override(config, env) {
  return {
    ...config,
    plugins: [
      ...config.plugins,
      new ModuleFederationPlugin({
        name: "gushi",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App",
        },
      }),
    ],
  };
};

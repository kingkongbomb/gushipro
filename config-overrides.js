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
        shared: {
          react: { singleton: true },
          "react-dom": { singleton: true },
        },
      }),
    ],
    output: {
      ...config.output,
      publicPath: "http://localhost:3001/",
    },
  };
};

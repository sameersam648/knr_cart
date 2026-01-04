module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  // Add module resolver for shared types
  plugins.push([
    "module-resolver",
    {
      root: ["./"],
      alias: {
        "@": "./",
        "@/shared": "../shared",
      },
    },
  ]);

  plugins.push("react-native-reanimated/plugin");

  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
    plugins,
  };
};

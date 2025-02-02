module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-transform-export-namespace-from', // Keep other plugins if needed
      'react-native-reanimated/plugin', // Keep other plugins if needed
    ],
  };
};
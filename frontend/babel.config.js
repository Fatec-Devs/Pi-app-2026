module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@components': './src/components',
            '@services': './src/services',
            '@contexts': './src/contexts',
            '@types': './src/types',
            '@hooks': './src/hooks',
            '@styles': './src/styles'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ],
  };
};

const path = require('path');
const {tanstackRouter} = require('@tanstack/router-plugin/webpack');

module.exports = {
  webpack: {
    alias: {
      '@ui': path.resolve(__dirname, 'src/shared/ui'),
      '@form': path.resolve(__dirname, 'src/shared/form'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@routes': path.resolve(__dirname, 'src/routes'),
    },
    plugins: {
      add: [
        tanstackRouter({
          target: 'react',
          autoCodeSplitting: true,
        }),
      ],
    },
  },
};

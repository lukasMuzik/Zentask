const path = require('path');
const {tanstackRouter} = require('@tanstack/router-plugin/webpack');

module.exports = {
  webpack: {
    alias: {
      '@ui': path.resolve(__dirname, 'src/shared/ui'),
      '@form': path.resolve(__dirname, 'src/shared/form'),
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

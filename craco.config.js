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
  jest: {
    configure: {
      moduleNameMapper: {
        '^@ui/(.*)$': '<rootDir>/src/shared/ui/$1',
        '^@form/(.*)$': '<rootDir>/src/shared/form/$1',
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@widgets/(.*)$': '<rootDir>/src/widgets/$1',
        '^@features/(.*)$': '<rootDir>/src/features/$1',
        '^@entities/(.*)$': '<rootDir>/src/entities/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',
        '^@routes/(.*)$': '<rootDir>/src/routes/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(svg)$': '<rootDir>/@types/svg.d.ts',
      },
    },
  },
  transformIgnorePatterns: ['node_modules/(?!(axios)/)'],
};

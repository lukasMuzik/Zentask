import {extendTheme} from '@chakra-ui/react';

const fontSizes = {
  heading: {
    1: '28px',
    2: '24px',
    3: '20px',
  },
  text: {
    base: '16px',
    small: '14px',
  },
};

const fontWeights = {
  heading: {
    1: 700,
    2: 600,
    3: 500,
  },
  text: {
    base: 400,
    alternative: 500,
  },
};

const theme = extendTheme({
  config: {initialColorMode: 'light', useSystemColorMode: false},
  colors: {
    'text-primary': '#001141',
    'text-secondary': '#4D5667',
    'text-tertiary': '#7A869A',
    'text-white': '#FFFFFF',
    'text-danger': '#B71C1C',

    'fill-brand': '#0F62FE',
    'fill-brand-hover': '#0043CE',
    'fill-darkBlue': '#001141',
    'fill-gray': '#F1F2F6',
    'fill-gray-hover': '#E6E8EF',
    'fill-gray-lightest': '#F1F2F6',
    'fill-white': '#FFFFFF',

    'border-brand': '#0F62FE',
    'border-gray': '#CAD1DE',
    'border-danger': '#E32C1E',
  },
  components: {
    Button: {
      baseStyle: () => ({
        bg: 'unset',
        letterSpacing: '0%',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
        _hover: {
          bg: 'unset',
        },
      }),

      sizes: {
        default: {
          h: '40px',
          px: '20px',
          py: '6px',
        },
        icon: {
          h: '40px',
          px: '12px',
          py: '6px',
        },
      },

      variants: {
        primary: (props: any) => ({
          backgroundColor: 'fill-brand',
          color: 'text-white',
          _hover: {
            backgroundColor: 'fill-brand-hover',
          },
          borderRadius: props.size === 'icon' ? '1000px' : '100px',
        }),
        secondary: (props: any) => ({
          color: 'text-primary',
          backgroundColor: 'fill-gray',
          borderRadius: props.size === 'icon' ? '1000px' : '100px',
        }),
        textOnly: (props: any) => ({
          color: 'text-primary',
          _hover: {
            backgroundColor: 'fill-gray',
          },
          borderRadius: props.size === 'icon' ? '1000px' : '100px',
        }),
      },

      defaultProps: {
        variant: 'primary',
        size: 'default',
      },
    },
    Input: {
      baseStyle: {
        field: {
          fontSize: 'text.base',
          fontWeight: 'text.base',
          color: 'text-primary',
          backgroundColor: 'fill-white',
          borderRadius: '4px',
          borderWidth: '1px',
          px: '16px',
          py: '12px',
          _placeholder: {
            color: 'text-tertiary',
          },
        },
      },
      variants: {
        default: {
          field: {
            borderColor: 'border-gray',
            _focus: {
              borderColor: 'border-brand',
              boxShadow: '0 0 0 4px rgba(15, 98, 254, 0.2)',
            },
          },
        },
        error: {
          field: {
            borderColor: 'border-danger',
          },
        },
      },
      defaultProps: {
        variant: 'default',
        size: 'default',
      },
    },
  },
  fontSizes,
  fontWeights,
});

export default theme;

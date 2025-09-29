import {extendTheme} from '@chakra-ui/react';
import {ButtonProps} from '@ui/Button/';

const fontSizes = {
  heading: {
    1: '1.75rem',
    2: '1.5rem',
    3: '1.125rem',
  },
  text: {
    base: '1rem',
    small: '0.875rem',
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

const lineHeights = {
  heading: {
    1: '2rem',
    2: '1.75rem',
    3: '1.5rem',
  },
  text: {
    base: '1.5rem',
    small: '1.25rem',
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
      baseStyle: {
        bg: 'unset',
        letterSpacing: '0%',
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: '1.25rem',
        _hover: {
          bg: 'unset',
        },
      },

      sizes: {
        default: {
          h: '2.5rem',
          px: '1.25rem',
          py: '0.375rem',
        },
        icon: {
          h: '2.5rem',
          px: '0.75rem',
          py: '0.375rem',
        },
      },

      variants: {
        primary: (props: ButtonProps) => ({
          backgroundColor: 'fill-brand',
          color: 'text-white',
          _hover: {
            backgroundColor: 'fill-brand-hover',
          },
          borderRadius: props.size === 'icon' ? '100%' : '6.25rem',
        }),
        secondary: (props: ButtonProps) => ({
          color: 'text-primary',
          backgroundColor: 'fill-gray',
          borderRadius: props.size === 'icon' ? '100%' : '6.25rem',
        }),
        textOnly: (props: ButtonProps) => ({
          color: 'text-primary',
          _hover: {
            backgroundColor: 'fill-gray',
          },
          borderRadius: props.size === 'icon' ? '100%' : '6.25rem',
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
          borderRadius: '0.25rem',
          borderWidth: '0.0625rem',
          px: '1rem',
          py: '0.75rem',
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
              boxShadow: '0 0 0 0.25rem rgba(15, 98, 254, 0.2)',
            },
            _invalid: {
              borderColor: 'border-danger',
            },
          },
        },
      },
      defaultProps: {
        variant: 'default',
        size: 'default',
      },
    },
    Textarea: {
      baseStyle: {
        fontSize: 'text.base',
        fontWeight: 'text.base',
        color: 'text-primary',
        backgroundColor: 'fill-white',
        borderRadius: '0.25rem',
        borderWidth: '0.0625rem',
        lineHeight: '1.5rem',
        p: '1rem',
        _placeholder: {
          color: 'text-tertiary',
        },
      },
      variants: {
        default: {
          borderColor: 'border-gray',
          _focus: {
            borderColor: 'border-brand',
            boxShadow: '0 0 0 0.25rem rgba(15, 98, 254, 0.2)', // 4px
          },
          _invalid: {
            borderColor: 'border-danger',
          },
        },
      },
      defaultProps: {
        variant: 'default',
        size: 'default',
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          height: '2rem',
          width: '2rem',
          backgroundColor: 'fill-white',
          borderColor: 'border-gray',
          borderRadius: '100%',

          _hover: {
            borderColor: 'fill-brand',
            boxShadow: '0 0 0 0.25rem rgba(15, 98, 254, 0.2)',
          },

          _checked: {
            backgroundColor: 'fill-brand',
            borderColor: 'fill-brand',
            _hover: {
              backgroundColor: 'fill-brand',
              borderColor: 'fill-brand',
            },
          },
        },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          w: '13.5rem',
          borderRadius: '1rem',
          border: '0.0625rem solid',
          borderColor: 'border-gray',
          backgroundColor: 'fill-white',
          p: '0.5rem',
          boxShadow: '0 0.5rem 2.5rem 0 rgba(0, 0, 0, 0.12)',
        },
        item: {
          borderRadius: '0.25rem',
          p: '0.5rem',
          fontSize: 'text.small',
          fontWeight: 'text.base',
          backgroundColor: 'fill-white',
          _hover: {
            backgroundColor: 'fill-gray-lightest',
          },
        },
      },
    },
  },
  fontSizes,
  fontWeights,
  lineHeights,
});

export default theme;

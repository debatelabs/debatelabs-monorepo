'use client';

import { createTheme } from '@mui/material/styles';
import themeConfig from './theme.config';

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: themeConfig.colors.primary.main
    },
    secondary: {
      main: themeConfig.colors.secondary
    },
    error: {
      main: themeConfig.colors.alert
    },
    background: {
      default: themeConfig.colors.dark.main,
      paper: themeConfig.colors.dark.lighter.main
    },
    text: {
      primary: themeConfig.colors.secondary,
      secondary: themeConfig.colors.primary.main
    },
    action: {
      disabled: themeConfig.colors.dark.text,
      disabledBackground: themeConfig.colors.highlight.main
    }
  },
  typography: {
    fontFamily: themeConfig.fonts.namu,
    htmlFontSize: 18,
    fontSize: 18,
    button: {
      textTransform: 'none',
      fontSize: 18,
      lineHeight: 1.5
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          color: themeConfig.colors.secondary,
          padding: '8px 18px'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: themeConfig.colors.dark.text
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderColor: themeConfig.colors.dark.text
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          '&:hover': {
            backgroundColor: themeConfig.colors.highlight.main
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 8,
          backgroundColor: themeConfig.colors.paper.main,
          border: `1px solid ${themeConfig.colors.paper.border}`
        }
      }
    }
  }
});

export default theme;

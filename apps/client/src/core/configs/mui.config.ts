'use client';

import { createTheme } from '@mui/material/styles';
import themeConfig from './theme.config';

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: themeConfig.colors.primary
    },
    secondary: {
      main: themeConfig.colors.secondary
    },
    error: {
      main: themeConfig.colors.alert
    },
    background: {
      default: themeConfig.colors.dark,
      paper: themeConfig.colors.dark
    },
    text: {
      primary: themeConfig.colors.secondary,
      secondary: themeConfig.colors.primary
    }
  },
  typography: {
    fontFamily: themeConfig.fonts.namu,
    htmlFontSize: 18,
    fontSize: 18,
    button: {
      textTransform: 'none',
      fontSize: 18
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '13px',
          color: themeConfig.colors.secondary
        }
      }
    }
  }
});

export default theme;

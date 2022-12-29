import { createTheme } from '@mui/material/styles';
import { colors } from '@mui/material';

export const themeModes = {
  dark: 'dark',
  light: 'light',
};

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette =
      mode === themeModes.dark
        ? {
            primary: {
              main: '#044f95',
              contrastText: '#f2f2f2',
            },
            secondary: {
              main: '#0563bb',
              contrastText: '#e6e6e6',
            },
            background: {
              default: '#000000',
              paper: 'rgba(13, 13, 13, 0.9)',
              input: 'rgba(26, 26, 26, 0.8)',
            },
          }
        : {
            primary: {
              main: '#0563bb',
            },
            secondary: {
              main: '#0563bb',
            },
            background: {
              default: colors.grey['100'],
              paper: 'rgba(255, 255, 255,0.9)',
              input: 'rgba(230, 230, 230, 0.8)',
            },
          };

    return createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
          xxl: 2048,
        },
      },
      palette: {
        mode,
        ...customPalette,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
        },
      },
    });
  },
};

export default themeConfigs;

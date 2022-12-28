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
            },
          };

    return createTheme({
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

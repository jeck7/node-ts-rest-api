import { createTheme } from '@mui/material/styles';

export const bevelTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffb300', // Bevel gold
      light: '#ffe082',
      dark: '#c68400',
      contrastText: '#222',
    },
    secondary: {
      main: '#00e5ff', // Bevel cyan
      light: '#6effff',
      dark: '#00b8d4',
      contrastText: '#222',
    },
    accent: {
      pink: '#ff4081',
      green: '#69f0ae',
      blue: '#2979ff',
      purple: '#b388ff',
    },
    background: {
      default: '#181a1b',
      paper: 'linear-gradient(145deg, #23272b 0%, #181a1b 100%)',
      bevel: 'linear-gradient(145deg, #23272b 0%, #181a1b 100%)',
      glass: 'rgba(255,255,255,0.04)',
    },
    text: {
      primary: '#fffde7',
      secondary: '#bdbdbd',
      accent: '#ffb300',
    },
  },
  typography: {
    fontFamily: '"SF Pro Display", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.3,
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.625rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #23272b 0%, #181a1b 100%)',
          boxShadow: '8px 8px 24px #101113, -8px -8px 24px #23272b',
          borderRadius: 20,
          border: '1px solid #23272b',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          padding: '8px 16px',
          minHeight: 40,
          boxShadow: '2px 2px 8px #101113, -2px -2px 8px #23272b',
        },
        contained: {
          background: 'linear-gradient(135deg, #ffb300 0%, #ffe082 100%)',
          color: '#222',
          boxShadow: '0 4px 16px #ffb30044',
          '&:hover': {
            background: 'linear-gradient(135deg, #ffe082 0%, #ffb300 100%)',
            boxShadow: '0 6px 20px #ffb30066',
          },
        },
        outlined: {
          borderColor: '#ffb300',
          color: '#ffb300',
          background: 'none',
          '&:hover': {
            borderColor: '#ffe082',
            backgroundColor: '#23272b',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #23272b 0%, #181a1b 100%)',
          borderRadius: 20,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
          fontSize: '0.75rem',
          background: 'linear-gradient(135deg, #23272b 0%, #181a1b 100%)',
          color: '#ffb300',
        },
      },
    },
  },
}); 
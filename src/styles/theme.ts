import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: 'white',
        bg: 'background'
      }
    }
  },
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif'
  },
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    background: '#0F1923',
    lightBackground: '#1D2730',
    primary: '#F12C4C',
    divider: '#1A242D',
    green: '#6ce98c'
  }
});

export { theme };

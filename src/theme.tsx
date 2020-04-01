import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

// A custom theme for this app
const theme = createMuiTheme({

  palette: {
    primary: {
      main: blue[900],
    },
    secondary: {
      main: red.A700,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#eee',
    },
  },
});

export default theme;

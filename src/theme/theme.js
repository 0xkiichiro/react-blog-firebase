import { createTheme } from "@mui/material";

const theme = createTheme({
  //TODO work on to change primary color theme instead!
  palette: {
    primary: {
      dark: "hsl(252, 51%, 23%)",
      main: "hsl(252, 59%, 52%)",
      light: "hsl(251, 64%, 71%)",
    },
    bgColor: "hsl(36, 99%, 55%)",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default theme;

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#4CAF50" },
    secondary: { main: "#FF9800" },
    background: { default: "#F5F5F5" },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export default theme;

import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme.jsx";
import AppRoutes from "./routes/routes.jsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;

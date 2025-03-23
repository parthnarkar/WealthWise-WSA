import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme.jsx";
import AppRoutes from "./routes/routes.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;

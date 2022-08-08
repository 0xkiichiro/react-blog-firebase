import { ThemeProvider } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AuthContextProvider from "./auth/AuthContext";
import AppRouter from "./router/AppRouter";
import theme, { darkTheme } from "./theme/theme";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <AuthContextProvider>
          <AppRouter />
        </AuthContextProvider>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}

export default App;

import { ThemeProvider } from "@emotion/react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import AppRouter from "./router/AppRouter";
import theme from "./theme/theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Navbar />
        <AppRouter />
      </ThemeProvider>
    </div>
  );
}

export default App;

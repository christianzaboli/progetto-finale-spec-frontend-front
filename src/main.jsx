import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import GlobalProvider from "./contexts/GlobalContext.jsx";
import ThemeProvider from "./contexts/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <GlobalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalProvider>
  </ThemeProvider>,
);

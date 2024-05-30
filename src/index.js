import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.scss";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import common_en from "./translations/eng/common.json";
import common_ru from "./translations/ru/common.json";

const container = document.getElementById("root");
const root = createRoot(container);

i18n.init({
  interpolation: { escapeValue: false },
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: { common: common_en },
    ru: { common: common_ru },
  },
});

const getStoredTheme = () => {
  return localStorage.getItem("theme") || "light";
};

const setStoredTheme = (theme) => {
  localStorage.setItem("theme", theme);
};

const AppWrapper = () => {
  const [themeMode, setThemeMode] = useState(getStoredTheme());

  useEffect(() => {
    setStoredTheme(themeMode);
  }, [themeMode]);

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <App themeMode={themeMode} setThemeMode={setThemeMode} />
          </I18nextProvider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

root.render(<AppWrapper />);

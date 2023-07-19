import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { ToastContainer } from "react-toastify";
import { StoreProvider } from "easy-peasy";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import App from "./App";
import React from "react";
import store from "../src/store/index";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function MyApp() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          components: {
            Input: {
              styles: (theme) => ({
                input: { borderColor: "black"},
                required: { display: "hidden"},
              }),
            },
          },
        }}
      >
        <React.StrictMode>
          <StoreProvider store={store}>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="light"
            />

            <App />
          </StoreProvider>
        </React.StrictMode>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<MyApp />);
reportWebVitals();

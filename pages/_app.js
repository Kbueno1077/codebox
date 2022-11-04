import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import { SnackbarProvider } from "notistack";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import { lightTheme, darkTheme } from "../styles/miuTheme";
import { RecoilRoot } from "recoil";

/**
React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles);
    }
}, []);
 */

export const ColorModeContext = React.createContext({
  themeColor: "light",
  toggleTheme: () => {}
});

function MyApp({ Component, pageProps }) {
  const [themeColor, toggleTheme] = React.useState("light");

  return (
    <>
      <Head>
        <title>CodeBox</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <RecoilRoot>
        <ColorModeContext.Provider value={{ themeColor, toggleTheme }}>
          <ThemeProvider
            theme={themeColor === "light" ? lightTheme : darkTheme}
          >
            <SnackbarProvider maxSnack={3}>
              <CssBaseline />

              <Component {...pageProps} />
            </SnackbarProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </RecoilRoot>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default MyApp;

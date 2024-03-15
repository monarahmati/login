import router from "router";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/system/ThemeProvider";
// import RightToLeft from "components/layout/right-to-left";
import { SnackbarProvider } from "notistack";
import { RouterProvider, } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";

// import "config/yup-config.ts";
import "assets/styles/font.css";
import "assets/styles/global.css";
import "react-medium-image-zoom/dist/styles.css";
import { reactQueryClient } from "config/react-query-keys-config";
// import Localization from "components/layout/localization";
import { useEffect } from "react";



// material ui theme
const theme = createTheme({
  direction: "rtl",
});

function App() {

  
  useEffect(() => {
    window.addEventListener("storage", (e) => {
      if (e?.key === "token-auth") {
        window.location.reload();
      }
    });
  }, []);

  return (
    <QueryClientProvider client={reactQueryClient}>
      <ThemeProvider theme={theme}>
        {/* <RightToLeft> */}
          {/* <Localization> */}
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
              autoHideDuration={2500}
              classes={{ containerRoot: "z-alert" }}
            >
              <CssBaseline />
              <RouterProvider router={router} />
            </SnackbarProvider>
          {/* </Localization> */}
        {/* </RightToLeft> */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

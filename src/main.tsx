import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {AppRoutes} from "./assets/context/AppRoutes.tsx";
import {createTheme, CssBaseline,  ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <AppRoutes/>
        </ThemeProvider>
    </StrictMode>,
)

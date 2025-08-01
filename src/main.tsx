import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {AppRoutes} from "./assets/context/AppRoutes.tsx";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {SpeedInsights} from "@vercel/speed-insights/react"
import {Analytics} from "@vercel/analytics/react"

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SpeedInsights/>
        <Analytics/>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <AppRoutes/>
        </ThemeProvider>
    </StrictMode>,
)

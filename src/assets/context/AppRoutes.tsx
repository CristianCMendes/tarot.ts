import {Routes, BrowserRouter, Route} from "react-router-dom";
import App from "../../App.tsx";

export function AppRoutes() {
    return (<BrowserRouter>
        <Routes>
            <Route path={'/'} element={<App/>}>
            </Route>
        </Routes>
    </BrowserRouter>)
}
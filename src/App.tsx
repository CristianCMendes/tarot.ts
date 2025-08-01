import {AppHeader} from "./assets/AppHeader.tsx";
import {Grid, Paper} from "@mui/material";
import {DrawCardPage} from "./assets/pages/DrawCardPage.tsx";

function App() {
    return (<Grid>
            <Grid container component={Paper} elevation={2}>
                <AppHeader/>
            </Grid>
            <Grid container component={Paper} m={3} mt={7} p={2}>
                    <DrawCardPage/>
            </Grid>
        </Grid>
    );

}

export default App;
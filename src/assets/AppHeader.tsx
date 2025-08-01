import {AppBar, Grid, IconButton, Typography} from "@mui/material";
import {GitHub, LinkedIn} from "@mui/icons-material";

export function AppHeader() {
    return (<AppBar sx={{p: 1, px: 2}}>
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
            <Grid>
                <Typography>Tarot by Cristian C Mendes</Typography>
            </Grid>
            <Grid container>
                <Grid>
                    <IconButton
                        onClick={() => window.open('https://www.linkedin.com/in/cristian-cardoso-mendes-b29a5216b/', '_blank')}>
                        <LinkedIn/>
                    </IconButton>
                </Grid>
                <Grid>
                    <IconButton onClick={() => window.open('https://github.com/CristianCMendes/tarot.ts', '_blank')}>
                        <GitHub/>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    </AppBar>)
}
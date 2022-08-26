import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    darkMode: boolean;
    handleModeChange: () => void; //return void
}

export default function header({darkMode, handleModeChange} : Props) {
    return (
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar>
                <Typography variant="h4">
                    Gin-Gin-Geroo Store
                </Typography>
                        <Switch 
                            checked={darkMode}
                            onChange={handleModeChange} 
                            color='secondary'
                        />
            </Toolbar>

        </AppBar>
    )
    
}
import { ShoppingCart } from "@mui/icons-material";
import { AppBar, ListItem, List, Switch, Toolbar, Typography, IconButton, Badge, Box } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

interface Props {
    darkMode: boolean;
    handleModeChange: () => void; //return void
}

//array to store links
const midLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'},
    {title: 'errors', path: '/errors'}
]

const rightLinks = [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'},
]

const navStyles = {
    color: 'inherit', 
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color : 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

export default function Header({darkMode, handleModeChange} : Props) {

const { basket } = useAppSelector(state => state.basket);
const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box display='flex' alignItems='center'>
                    <Typography 
                        variant='h4' 
                        component={NavLink} 
                        to='/' 
                        exact
                        sx={navStyles}>
                        Gin-Gin-Geroo Store
                    </Typography>
                    <Switch 
                        checked={darkMode}
                        onChange={handleModeChange} 
                        color='secondary'
                    />
                </Box>
                    <List sx={{display: 'flex'}}>
                        {midLinks.map(({title, path}) => (
                            <ListItem 
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/basket' size="large" sx={{color: 'inherit'}}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{display: 'flex'}}>
                        {rightLinks.map(({title, path}) => (
                            <ListItem 
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>

        </AppBar>
    )
    
}
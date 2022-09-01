import {useState} from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContactIcon from '@mui/icons-material/ContactPage';


export default function Footer() {
const [value, setValue] = useState(0);

return (
    <Box sx={{ width:"100%", mt: "15px"}}>

        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue)
            }}
        >
            <BottomNavigationAction label="Home" href='https://www.gingingeroo.co.uk' target="_blank" icon={<HomeIcon />} />
            <BottomNavigationAction label="Favourites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Contact" icon={<ContactIcon />} />
        </BottomNavigation>
    </Box>
)
}

import { Box, Card, CardContent, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useAppSelector } from "../../app/store/configureStore";

export default function Profile() {
    const { user } = useAppSelector(state => state.account);
    console.log(user)
    return (
        <Box>
            <Typography variant='h2' align='center' color='text.secondary'>Welcome {user?.firstName}</Typography>
            <Card sx={{minWidth:'80%', mt:2}}>

                <Typography variant='h2' align='center' color='text.secondary'>My Profile</Typography>
                <Container>
                    <CardContent>Email: {user?.email}</CardContent>
                </Container>    
                
            </Card>
        </Box>
    )
}
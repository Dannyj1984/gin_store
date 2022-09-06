import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/storeContext";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {

    const { basket, setBasket, removeItem } = useStoreContext();
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });

    function handleAddItem(productId: number, name: string) {
        setStatus({loading: true, name});
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setStatus({loading: false, name: ''}))
    }

    function handleRemoveItem(productId: number, quantity = 1, name: string) {
        setStatus({loading: true, name});
        agent.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setStatus({loading: true, name: ''}))
    }

    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>
    

    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {basket.items.map(item => (
                    <TableRow
                    key={item.productId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        <Box display='flex' alignItems='center'>
                            {/* Image and link to product details */}
                            <Button
                                component={Link}
                                to={`/catalog/${item.productId}`}
                            >
                                <img 
                                src={item.pictureUrl} 
                                alt={item.name} 
                                style={{height: 50, 
                                marginRight: 20}} 
                            />
                    </Button>
                            <span>{item.name}</span>
                        </Box>
                    </TableCell>
                    <TableCell align="right">£{(item.price / 100).toFixed(2)}</TableCell>
                    <TableCell align="center">
                        <LoadingButton 
                            loading={status.name === 'rem'+item.productId && status.loading} 
                            color="error" 
                            onClick={() => handleRemoveItem(item.productId, 1, 'rem'+item.productId)}>
                            <Remove />
                        </LoadingButton>
                        {item.quantity}
                        <LoadingButton 
                            loading={status.name ==='add'+item.productId && status.loading} 
                            color="secondary" 
                            onClick={() => handleAddItem(item.productId, 'add'+item.productId)}>
                            <Add />
                        </LoadingButton>
                    </TableCell>
                    <TableCell align="right">£{((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                        <LoadingButton 
                            loading={status.name === 'delete'+item.productId && status.loading} 
                            color='error' 
                            onClick={() => handleRemoveItem(item.productId, item.quantity, 'delete'+item.productId)}>
                            <Delete />
                        </LoadingButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            {/* Summary component */}
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
                
            </Grid>
        </>
    )
}
import { Subtitles } from "@mui/icons-material";
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Grid } from "@mui/material";
import { useStoreContext } from "../../app/context/storeContext";
import { currencyFormat } from "../../app/util/util";

export default function BasketSummary() {
    const { basket } = useStoreContext(); //get access to basket
    // ?? operator gives value of 0 if returned undefined
    let subTotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    let deliveryFee = subTotal > 10000 ? 0 : 1000;

    return (
        <>
        
            <TableContainer component={Paper} variant={'outlined'}>
            <Grid item xs={12}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell  align="right">{currencyFormat(subTotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell  align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell  align="right">{currencyFormat(subTotal+ deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over £100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </Grid>
            </TableContainer>
            
           
        </>
    )
}
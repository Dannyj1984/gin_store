import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Grid } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";

interface Props {
    subTotal?: number;
}

export default function BasketSummary({subTotal}: Props) {
    const { basket } = useAppSelector(state => state.basket); //get access to basket
    // ?? operator gives value of 0 if returned undefined
    if(subTotal === undefined)
        subTotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    let deliveryFee = subTotal > 10000 ? 0 : 500;

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
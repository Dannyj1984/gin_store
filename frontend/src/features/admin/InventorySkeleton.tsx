import { Edit, Delete } from "@mui/icons-material";
import {
    Box,
    Button,
    Skeleton,
    TableCell,
    TableRow
} from "@mui/material";

export default function ProductCardSkeleton() {
    return (
        <TableRow>
            <TableCell component="th" scope="row">
                <Skeleton
                    animation="wave"
                    variant="text"
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                />
            </TableCell>
            <TableCell align="left">
                <Box display='flex' alignItems='center'>
                <Skeleton
                        animation="wave"
                        height={10}
                        width="100%"
                        style={{ marginBottom: 6 }}
                    />
                </Box>
            </TableCell>
            <TableCell align="right">
                <Skeleton
                    animation="wave"
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                />
            </TableCell>
            <TableCell align="center">
                <Skeleton
                    animation="wave"
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                />
            </TableCell>
            <TableCell align="center">
                <Skeleton
                    animation="wave"
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                />
            </TableCell>
            <TableCell align="center">
                <Skeleton
                    animation="wave"
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                />
            </TableCell>
            <TableCell align="right">
                <Button startIcon={<Edit />} />
                <Button startIcon={<Delete />} color='error' />
            </TableCell>
        </TableRow>
    )
}
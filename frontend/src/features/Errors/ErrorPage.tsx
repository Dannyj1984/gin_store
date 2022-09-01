import { Typography, Container, Button, ButtonGroup, Alert, AlertTitle, ListItemText, List, ListItem } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function ErrorPage() {

const [validationErrors, setValidationErrors] = useState<string[]>([]);

function getValidationError() {
    agent.testErrors.getValidationError()
    .then(() => console.log('should not see this'))
    .catch(error => setValidationErrors(error))
}

    return (
        <Container>
            <Typography gutterBottom variant="h2">
                Error page
            </Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={() => agent.testErrors.get400Error().catch(error => console.log(error))}>Test 400 error</Button>
                <Button variant='contained' onClick={() => agent.testErrors.get401Error().catch(error => console.log(error))}>Test 401 error</Button>
                <Button variant='contained' onClick={() => agent.testErrors.get404Error().catch(error => console.log(error))}>Test 404 error</Button>
                <Button variant='contained' onClick={() => agent.testErrors.get500Error().catch(error => console.log(error))}>Test 500 error</Button>
                <Button variant='contained' onClick={getValidationError}>Test Validation error</Button>


            </ButtonGroup>
            {validationErrors.length > 0 &&
            <Alert severity="error">
                <AlertTitle>Validation Errors</AlertTitle>
                <List>
                    {validationErrors.map(error => (
                        <ListItem key={error}>
                            <ListItemText>{error}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Alert>
            }
        </Container>
        
    )
}
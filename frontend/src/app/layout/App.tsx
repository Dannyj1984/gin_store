import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Catalog from "../../features/Catalog/Catalog";
import Header from "./Header";

function App() {

  //Change style between light and darkmode

  const[darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? "#eaeaea" : '#121212'
      }
    }
  })

  function handleModeChange() {
    setDarkMode(!darkMode) //set to opposeite of current state
    
  }

  
  return (
    <>
    <ThemeProvider theme={theme} >
    <CssBaseline />
    <Header  
      darkMode={darkMode} 
      handleModeChange={handleModeChange} 
    />
    <Container>
      <Catalog />
    </Container>
    </ThemeProvider>
      
    </>
  );
}

export default App;

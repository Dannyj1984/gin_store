import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/Catalog/Catalog";
import ProductDetails from "../../features/Catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
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
    {/* exact means to only show if the url is that exact path */}
      <Route path='/' exact component={HomePage} /> 
      <Route path='/catalog' exact component={Catalog} />
      <Route path='/catalog/:id' component={ProductDetails} />
      <Route path='/contact' component={ContactPage} />
      <Route path='/about' component={AboutPage} />
    </Container>
    </ThemeProvider>
      
    </>
  );
}

export default App;

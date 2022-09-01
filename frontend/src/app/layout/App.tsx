import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/Catalog/Catalog";
import ProductDetails from "../../features/Catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import Footer from "./Footer";
import ErrorPage from "../../features/Errors/ErrorPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";

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
      <ToastContainer position="bottom-right" theme="colored" hideProgressBar />  
      <CssBaseline />
      <Header  
        darkMode={darkMode} 
        handleModeChange={handleModeChange} 
      />
      <Container>
        <Switch>
            {/* exact means to only show if the url is that exact path */}
          <Route exact path='/' component={HomePage} /> 
          <Route exact path='/catalog' component={Catalog} />
          <Route path='/catalog/:id' component={ProductDetails} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/errors' component={ErrorPage} />
          <Route path='/server-error' component={ServerError} />
          <Route  component={NotFound} />
        </Switch>
      
      </Container>
      <Footer />
    </ThemeProvider>
      
    </>
  );
}

export default App;

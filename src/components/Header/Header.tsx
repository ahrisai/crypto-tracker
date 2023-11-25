import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import { SelectChangeEvent, createTheme } from "@mui/material";
import {
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";

import { ThemeProvider } from "@emotion/react";
import { RootState, useAppDispatch } from "../../redux/store";
import { IChangeCurrencyPayload, changeCurrency } from "../../redux/cryptoSlice";
import {useSelector} from 'react-redux'
import { CurrencyType } from "../../types/currencyType";

const Header = () => {
   
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary:{
            main:'#fff'
          }
        },
      })

      const dispatch= useAppDispatch()
      const currency=useSelector((state:RootState)=>state.cryptoReducer.currentCurrency)

      const handleChange=(e:SelectChangeEvent<string>) => {
        dispatch(changeCurrency({newCurrency:e.target.value as CurrencyType}))
      }

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
            
          <Typography sx={{fontSize:30, fontWeight:700, color:'gold', m:2, fontFamily:'montseratt'}}><Link to='/'>CryptoTracker</Link></Typography>
            <Select value={currency} onChange={(e)=>{handleChange(e)}} variant="outlined" sx={{width:100}} >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'RUB'}>RUB</MenuItem>
             
            </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
};

export default Header;

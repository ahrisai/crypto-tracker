import {createSlice, createAsyncThunk,PayloadAction} from '@reduxjs/toolkit'
import { currencies } from '../helpers/currencies';
import { CurrencyType } from '../types/currencyType';

interface ICryptoState{
    currentCurrency:string
    currencySymbol:string
}

export interface IChangeCurrencyPayload {
    newCurrency: CurrencyType
  }

const initialState={
currentCurrency:'USD',
currencySymbol:'$'
} as ICryptoState

const cryptoSlice = createSlice({
    name:'cryptoReducer',
    initialState,
    reducers:{
        changeCurrency(state,action:PayloadAction<IChangeCurrencyPayload>){
            state.currentCurrency=action.payload.newCurrency
            state.currencySymbol=currencies[action.payload.newCurrency]
        }
    }

})

export const {changeCurrency} = cryptoSlice.actions
export default cryptoSlice.reducer

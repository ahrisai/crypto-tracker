import { Coin,ICoin, ICryptoChart } from './../types/CryptoTypes';
import {createSlice, createAsyncThunk,PayloadAction} from '@reduxjs/toolkit'
import { currencies } from '../helpers/currencies';
import { CurrencyType } from '../types/currencyType';
import axios from 'axios';
import { CoinList, HistoricalChart, SingleCoin, TrendingCoins } from './pathes';

interface ICryptoState{
    currentCurrency:string,
    currencySymbol:string,

    trendingCoins:Coin[],
    trendingCoinsStatus:'idle'|'pending'|'error'|'fulfilled',
    trendingCoinsError:string,

    coinList:Coin[]
    coinListStatus:'idle'|'pending'|'error'|'fulfilled',
    coinListError:string

    singleCoin:ICoin | null
    singleCoinStatus:'idle'|'pending'|'error'|'fulfilled',
    singleCoinError:string,

    chartStatus:'idle'|'pending'|'error'|'fulfilled',
    chartError:string
    chartPrices:any[]
}

interface IChartParams{
    id:string,
    currency:string,
    days?:number
}
export const fetchSingleCoin=createAsyncThunk(
    'cryptoReducer/fetchSingleCoin',
    async (id:string,{rejectWithValue}) => {
        
        const response = axios.get<ICoin>(`${SingleCoin(id)}`)
        .then(res=>{
                console.log(res.data)
                return res.data
        })
        .catch(e=>{
            return rejectWithValue(e.message)
        })

        return response
    }
)



export const fetchChartInfo=createAsyncThunk(
    'cryptoReducer/fetchChartInfo',
    async (chartParams:IChartParams,{rejectWithValue}) => {
        
        const response = axios.get<ICryptoChart>(`${HistoricalChart(chartParams.id,chartParams.days,chartParams.currency)}`)
        .then(res=>{
             
                return res.data
        })
        .catch(e=>{
            return rejectWithValue(e.message)
        })

        return response
    }
)

export const fetchTrending = createAsyncThunk(
    'cryptoReducer/fetchTrending',
    async (currency:CurrencyType,{rejectWithValue}) => {
        
        const response = axios.get<Coin[]>(`${TrendingCoins(currency)}`,{
        }).then(res=>{
            console.log(res.data)
            return res.data
        })
        .catch(e=>rejectWithValue(e.message))
        return response

    }
)

export const fetchCoinList = createAsyncThunk(
    'cryptoReducer/fetchCoinList',
    async (currency:CurrencyType,{rejectWithValue}) => {

            const response = axios.get<Coin[]>(`${CoinList(currency)}`,{
            }).then(res=>{
                console.log(res.data)
                return res.data
            })
            .catch(e=>rejectWithValue(e.message))
            return response

       

    }
)





export interface IChangeCurrencyPayload {
    newCurrency: CurrencyType
  }

const initialState:ICryptoState={
currentCurrency:'USD',
currencySymbol:'$',

trendingCoins:[],
trendingCoinsStatus:'idle',
trendingCoinsError:'',

coinList:[],
coinListStatus:'idle',
coinListError:'',

singleCoin:null,
singleCoinStatus:'idle',
singleCoinError:'',

chartStatus:'idle',
chartError:'',
chartPrices:[]
} 

const cryptoSlice = createSlice({
    name:'cryptoReducer',
    initialState,
    reducers:{
        changeCurrency(state,action:PayloadAction<IChangeCurrencyPayload>){
            state.currentCurrency=action.payload.newCurrency
            state.currencySymbol=currencies[action.payload.newCurrency]
        }
    },
    extraReducers:{
        
        //trending
        [fetchTrending.pending.type]:(state)=>{
            state.trendingCoinsStatus='pending'
        },
        [fetchTrending.fulfilled.type]:(state,action:PayloadAction<Coin[]>)=>{
            state.trendingCoinsStatus='fulfilled'
            state.trendingCoins=action.payload
        },
        [fetchTrending.rejected.type]:(state,action:PayloadAction<string>)=>{
            state.trendingCoinsStatus='error'
            state.trendingCoinsError=action.payload
        },


        //coinList
        [fetchCoinList.pending.type]:(state)=>{
            state.coinListStatus='pending'
        },
        [fetchCoinList.fulfilled.type]:(state,action:PayloadAction<Coin[]>)=>{
            state.coinListStatus='fulfilled'
            state.coinList=action.payload
        },
        [fetchCoinList.rejected.type]:(state,action:PayloadAction<string>)=>{
            state.coinListStatus='error'
            state.coinListError=action.payload
        },

        //singleCoin
        [fetchSingleCoin.pending.type]:(state)=>{
            state.singleCoinStatus='pending'
        },
        [fetchSingleCoin.fulfilled.type]:(state,action:PayloadAction<ICoin>)=>{
            state.singleCoinStatus='fulfilled'
            state.singleCoin=action.payload
        },
        [fetchSingleCoin.rejected.type]:(state,action:PayloadAction<string>)=>{
            state.singleCoinStatus='error'
            state.singleCoinError=action.payload
        },

        //chart
        [fetchChartInfo.pending.type]:(state)=>{
            state.chartStatus='pending'
        },
        [fetchChartInfo.fulfilled.type]:(state,action:PayloadAction<ICryptoChart>)=>{
            state.chartStatus='fulfilled'
            state.chartPrices=action.payload.prices
        },
        [fetchChartInfo.rejected.type]:(state,action:PayloadAction<string>)=>{
            state.chartStatus='error'
            state.chartError=action.payload
        },
    }

})

export const {changeCurrency} = cryptoSlice.actions
export default cryptoSlice.reducer

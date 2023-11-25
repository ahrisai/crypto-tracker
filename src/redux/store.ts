import { configureStore, } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cryptoSlice from "./cryptoSlice";
export const store = configureStore({
    reducer:{
        cryptoReducer:cryptoSlice
    }
})
 
export type appDispatch = typeof store.dispatch;
export const useAppDispatch:()=>appDispatch=useDispatch;
export type RootState= ReturnType <typeof store.getState>
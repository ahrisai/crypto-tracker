import React, { useEffect } from 'react'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { fetchCoinList } from '../../redux/cryptoSlice'
import { CurrencyType } from '../../types/currencyType'

const CoinsTable = () => {
    const dispatch=useAppDispatch()
    const {coinList, currentCurrency, coinListStatus}=useSelector((state:RootState)=>state.cryptoReducer)
    
    useEffect(() => {
     dispatch(fetchCoinList(currentCurrency as CurrencyType))
    }, [])
    console.log(coinList)
  return (
    <></>
    // coinListStatus==='pending'
    // ?<h1>Loading...</h1>
    // :coinList.
    
  )
}

export default CoinsTable
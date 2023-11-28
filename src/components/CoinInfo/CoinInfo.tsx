import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../redux/store'
import { fetchChartInfo } from '../../redux/cryptoSlice'
import styled from 'styled-components'
import { CircularProgress } from '@mui/material'

const ChartContainer=styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  padding: 40px;
  @media screen and (max-width:1000px) {
    width: 100%;
    margin-top: 0;
    padding: 20px;
    padding-top: 0;
  }
`

const CoinInfo = () => {
  const [days, setDays] = useState(1)
  const {currentCurrency,currencySymbol,singleCoin}=useSelector((state:RootState)=>state.cryptoReducer)
  const dispatch=useAppDispatch()
  useEffect(() => {
    if(singleCoin)
    dispatch(fetchChartInfo({id:singleCoin?.id as string,currency:currentCurrency ,days}))
  }, [days,currentCurrency,singleCoin])
  
  return (
    <ChartContainer>

    </ChartContainer>
  )
}

export default CoinInfo
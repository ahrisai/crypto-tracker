import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../redux/store'
import { fetchSingleCoin } from '../redux/cryptoSlice'
import { useParams } from 'react-router-dom'
import { LinearProgress} from '@mui/material'
import styled from 'styled-components'
import CoinInfo from '../components/CoinInfo/CoinInfo'
import { ICoinImage } from '../types/CryptoTypes'






const Container = styled.div`
  display: flex;
@media screen and (min-width: 768) {
  flex-direction: column;
  align-items: center;
}
`

const CoinImage=styled.img`
  width: 100%;
`

const SideBar=styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  border-right: '2px solid grey';

  @media screen and (min-width: 768) {
    width: 100%;
  }
`



const Coin = () => {



const {singleCoin,singleCoinStatus,currentCurrency,currencySymbol}= useSelector((state:RootState)=>state.cryptoReducer)
const dispatch = useAppDispatch()



const params= useParams()

  useEffect(() => {
    if(params.id) dispatch(fetchSingleCoin(params.id))
  }, [])
  
  return (
    singleCoinStatus==='pending'||singleCoinStatus==='idle'

    ?<LinearProgress  sx={{ backgroundColor: "gold" }}/>
    :<Container> 
      <SideBar>
      <CoinImage src={(singleCoin?.image as ICoinImage).large } alt="" />
      
      </SideBar>
     
        <CoinInfo/>
    </Container>
  )
}

export default Coin
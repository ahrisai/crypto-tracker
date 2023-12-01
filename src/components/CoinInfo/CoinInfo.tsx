import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../redux/store'
import { fetchChartInfo } from '../../redux/cryptoSlice'
import styled from 'styled-components'
import { CircularProgress } from '@mui/material'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale,LinearScale,PointElement,LineElement,Legend } from 'chart.js';



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
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Legend);

  const [days, setDays] = useState(1)
  const {currentCurrency,singleCoin,chartPrices,chartStatus}=useSelector((state:RootState)=>state.cryptoReducer)
  
  const dispatch=useAppDispatch()
  useEffect(() => {
    if(singleCoin)
    dispatch(fetchChartInfo({id:singleCoin?.id as string,currency:currentCurrency ,days}))
  }, [days,currentCurrency,singleCoin])
  
  return (
    <ChartContainer>
      {chartStatus==='pending'
      ?<CircularProgress
      sx={{ color: "gold" }}
      size={250}
      thickness={1}
    />
      :<>
      <Line

      datasetIdKey='id'
      data={{
        labels: chartPrices.map((coin) => {
          const date = new Date(coin[0]);
          const time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;
          return days === 1 ? time : date.toLocaleDateString();
        }),

        datasets: [
          {
            label: `Price ( Past ${days} Days ) in ${currentCurrency}`,
            data: chartPrices.map((coin) => coin[1]),
            borderColor: "#EEBC1D",
          },
        ],
      }}
      
      options={{
        responsive:true,
        plugins:{
          legend:{
            position:'top' as const,
          }
        },
        elements: {
          point: {
            radius: 1,
          },
          
        },
      
      }}
    />
    </>
      }
    </ChartContainer>
  )
}

export default CoinInfo
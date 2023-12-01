import React, { FC } from 'react'
import styled from 'styled-components'

const SelectButton=styled.span`
        border: 1px solid gold;
      border-radius: 5px;
      padding: 10px;
      padding-left: 20px;
      padding-right: 20px;
      font-family: "montseratt";
      cursor: pointer;
      background-color: gold;
      color: #333 ;
      font-weight:  500;
      
     
      width: 130px;
      text-align: center;
      transition: all .2s ease-in-out;
      &:hover{
      background-color: #333;
        color:gold
      }
        &:active{
      background-color: #333;
        color:gold;
      }
      
`

const ActiveSelectedButton = styled.span`
      border: 1px solid gold;
      border-radius: 5px;
      padding: 10px;
      padding-left: 20px;
      padding-right: 20px;
      font-family: "montseratt";
      cursor: pointer;
      background-color: #333;
      color: gold ;
      font-weight:  500;
      width: 130px;
      text-align: center;

 
`


interface DataSelectProps{
    children:React.ReactNode,
    selected:boolean,
    onClick:()=>void
}
const DataSelect:FC<DataSelectProps> = ({children,selected,onClick}) => {



  return (
    selected
    ?<ActiveSelectedButton  onClick={onClick} >
    {children}
  </ActiveSelectedButton>
    :
      <SelectButton  onClick={onClick} >
      {children}
    </SelectButton>
    
    
    
  )
}

export default DataSelect
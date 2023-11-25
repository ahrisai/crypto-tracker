
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Coin from './pages/Coin'
import { useState } from 'react'
function App() {
  
  

  
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coins/:id' element={<Coin/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App


import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Coin from './pages/Coin'
import { Navigate } from 'react-router-dom'
function App() {
  
  

  
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coins/:id' element={<Coin/>}/>
        <Route path='*' element={<Navigate to='/'/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

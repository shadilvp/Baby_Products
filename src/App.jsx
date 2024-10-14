
import './App.css'
import { Route, Routes } from 'react-router-dom'

import Home from './Components/pagas/Home'
import About from './Components/pagas/About'
import Contact from './Components/pagas/Contact'
import LogIn from './Components/LogIn-SignIn/LogIn'
import SignUp from './Components/LogIn-SignIn/SignUp'
import Cart from './Components/pagas/Cart'
import Shop from './Components/pagas/Shop'
import Context from './Hooks/Context'
import ShowItem from './Components/pagas/ShowItems'
import ProceedPayment from './Components/pagas/ProceedPayment'
import UserDetails from './Components/pagas/UserDetails'


function App() {
  
  return (
    <>

                <Context>
                  <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/contact' element={<Contact/>}/>
                    <Route path='/login' element={<LogIn/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/shop' element={<Shop/>}/>
                    <Route path='/shop/:id' element={<ShowItem/>}/>
                    <Route path='/proceedpayment' element={<ProceedPayment/>}/>
                    <Route path='/userdetails' element={<UserDetails/>}/>

                  </Routes>
                </Context>

    </>
  )
}

export default App

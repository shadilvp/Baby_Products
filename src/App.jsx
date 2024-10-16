
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './User/Components/pagas/Home'
import About from './User/Components/pagas/About'
import Contact from './User/Components/pagas/Contact'
import LogIn from './User/Components/LogIn-SignIn/LogIn'
import SignUp from './User/Components/LogIn-SignIn/SignUp'
import Cart from './User/Components/pagas/Cart'
import Shop from './User/Components/pagas/Shop'
import Context from './User/Hooks/Context'
import ShowItem from './User/Components/pagas/ShowItems'
import ProceedPayment from './User/Components/pagas/ProceedPayment'
import UserDetails from './User/Components/pagas/UserDetails'


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


import './App.css'
import { Route, Routes } from 'react-router-dom'
// User
import Home from './Components/User/pagas/Home.jsx'
import About from './Components/User/pagas/About'
import Contact from './Components/User/pagas/Contact'
import LogIn from './Components/User/LogIn-SignIn/LogIn.jsx'
import SignUp from './Components/User/LogIn-SignIn/SignUp.jsx'
import Cart from './Components/User/pagas/Cart'
import Shop from './Components/User/pagas/Shop'
import ShowItem from './Components/User/pagas/ShowItems'
import ProceedPayment from './Components/User/pagas/ProceedPayment'
import UserDetails from './Components/User/pagas/UserDetails'
// admin
import Dashboard from './Components/Admin/Pages/Dashboard'
import AddProducts from './Components/Admin/Pages/AddProducts'
import AllProducts from './Components/Admin/Pages/AllProducts'
import EditProducts from './Components/Admin/Pages/EditProducts'
import Users from './Components/Admin/Pages/Users'
import UserDetailsAdmin from './Components/Admin/Pages/UserDetailsAdmin'
import NoMatch from './Components/Nomatches.jsx/Nomatches.jsx'

import Context from './Context/Context.jsx'


function App() {
  
  return (
    <>

                <Context>
                  <Routes>
                    <Route path='/login' element={<LogIn/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                    {/* user */}
                    <Route path='/' element={<Home/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/contact' element={<Contact/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/shop' element={<Shop/>}/>
                    <Route path='/shop/:id' element={<ShowItem/>}/>
                    <Route path='/proceedpayment' element={<ProceedPayment/>}/>
                    <Route path='/userdetails' element={<UserDetails/>}/>
                    {/* admin */}
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/addproducts' element={<AddProducts/>}/>
                    <Route path='/allproducts' element={<AllProducts/>}/>
                    <Route path='/allproducts/:id' element={<EditProducts/>}/>
                    <Route path='/users' element={<Users/>}/>
                    <Route path='/users/:id' element={<UserDetailsAdmin/>}/>

                    <Route path="*" element={<NoMatch/>}/>
                  </Routes>
                </Context>

    </>
  )
}

export default App

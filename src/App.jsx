
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './User/Components/pagas/Home'
import About from './User/Components/pagas/About'
import Contact from './User/Components/pagas/Contact'
import LogIn from './User/Components/LogIn-SignIn/LogIn'
import SignUp from './User/Components/LogIn-SignIn/SignUp'
import Cart from './User/Components/pagas/Cart'
import Shop from './User/Components/pagas/Shop'
import Context from './Hooks/Context'
import ShowItem from './User/Components/pagas/ShowItems'
import ProceedPayment from './User/Components/pagas/ProceedPayment'
import UserDetails from './User/Components/pagas/UserDetails'
import Dashboard from './Admin/Cmponents/Dashboard'
import AddProducts from './Admin/Cmponents/AddProducts'
import AllProducts from './Admin/Cmponents/AllProducts'
import EditProducts from './Admin/Cmponents/EditProducts'
import Users from './Admin/Cmponents/Users'
import UserDetailsAdmin from './Admin/Cmponents/UserDetailsAdmin'
import NoMatch from './User/Nomatches.jsx/Nomatches'


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
                    <Route path='/editproducts' element={<EditProducts/>}/>
                    <Route path='/users' element={<Users/>}/>
                    <Route path='/users/:id' element={<UserDetailsAdmin/>}/>

                    <Route path="*" element={<NoMatch/>}/>
                  </Routes>
                </Context>

    </>
  )
}

export default App

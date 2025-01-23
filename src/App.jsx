
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './Components/User/Protected.jsx'

// User
import Home from './Components/User/pagas/Home.jsx'
import About from './Components/User/pagas/About'
import Contact from './Components/User/pagas/Contact'
import LogIn from './Components/User/LogIn-SignIn/LogIn.jsx'
import SignUp from './Components/User/LogIn-SignIn/SignUp.jsx'
import Cart from './Components/User/pagas/Cart'
import Shop from './Components/User/pagas/Shop'
import ShowItem from './Components/User/pagas/ShowItems'
import AddressPage from './Components/User/pagas/addressPage.jsx'
import ProceedPayment from './Components/User/pagas/ProceedPayment'

// admin
import Dashboard from './Components/Admin/Pages/Dashboard'
import AddProducts from './Components/Admin/Pages/AddProducts'
import AllProducts from './Components/Admin/Pages/AllProducts'
import EditProducts from './Components/Admin/Pages/EditProducts'
import Users from './Components/Admin/Pages/Users'
import UserDetailsAdmin from './Components/Admin/Pages/UserDetailsAdmin'
import Orders from './Components/Admin/Pages/Orders.jsx'

import NoMatch from './Components/Nomatches.jsx/Nomatches.jsx'
import UserOrders from './Components/User/pagas/UserOrders.jsx'


function App() {
  
  return (
    <>

                  <Routes>
                    <Route path='/login' element={<LogIn/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                    {/* user */}
                    <Route path='/' element={<Home/>}/>
                    <Route path='/shop' element={<Shop/>}/>
                    <Route path='/shop/:id' element={<ShowItem/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/address' element={<AddressPage/>}/>
                    <Route path='/proceedpayment' element={<ProceedPayment/>}/>
                    <Route path='/userOrders' element={<UserOrders/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/contact' element={<Contact/>}/>


                    {/* admin */}
                    <Route
                    path="/dashboard"
                    element={<ProtectedRoute element={<Dashboard />} isAdmin={true} />}
                    />
                    <Route
                    path="/users"
                    element={<ProtectedRoute element={<Users />} isAdmin={true} />}
                    />
                    <Route
                      path="/users/:userId"
                      element={<ProtectedRoute element={<UserDetailsAdmin />} isAdmin={true} />}
                    />
                    <Route
                      path="/allproducts"
                      element={<ProtectedRoute element={<AllProducts />} isAdmin={true} />}
                    />
                    <Route
                      path="/allproducts/:productId"
                      element={<ProtectedRoute element={<EditProducts />} isAdmin={true} />}
                    />
                    <Route
                      path="/addproducts"
                      element={<ProtectedRoute element={<AddProducts />} isAdmin={true} />}
                    />
                    <Route
                      path="/orders"
                      element={<ProtectedRoute element={<Orders />} isAdmin={true} />}
                    />

                    {/* No pages */}
                    <Route path="*" element={<NoMatch/>}/>
                  </Routes>

    </>
  )
}

export default App

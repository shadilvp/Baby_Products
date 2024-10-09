
import './App.css'
import { Route, Routes } from 'react-router-dom'

import Home from './Components/pagas/Home'
import About from './Components/pagas/About'
import Contact from './Components/pagas/Contact'
import LogIn from './Components/LogIn-SignIn/LogIn'
import SignUp from './Components/LogIn-SignIn/SignUp'
import Cart from './Components/pagas/Cart'
import Shop from './Components/pagas/Shop'
import Context from './Hooks/Context' //importing hook
import ShowItem from './Components/pagas/ShowItems'


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
                  </Routes>
                </Context>

    </>
  )
}

export default App

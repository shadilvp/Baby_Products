import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import Home from './Components/pagas/Home'
import About from './Components/pagas/About'
import Contact from './Components/pagas/Contact'
import LogIn from './Components/LogIn-SignIn/LogIn'
import SignUp from './Components/LogIn-SignIn/SignUp'
import Cart from './Components/pagas/Cart'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </>
  )
}

export default App

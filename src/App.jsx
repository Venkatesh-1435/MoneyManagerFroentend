import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Income from './Pages/Income'
import Expense from './Pages/Expense'
import Category from './Pages/Category'
import Filter from './Pages/Filter'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Root/>}></Route>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/income' element={<Income/>}></Route>
          <Route path='/expense' element={<Expense/>}></Route>
          <Route path='/category' element={<Category/>}></Route>
          <Route path='/filter' element={<Filter/>}></Route>
        </Routes>
     </BrowserRouter>
    </>
  )
}
const Root=()=>{
  const isAuthenticated=!!localStorage.getItem("token");
  return isAuthenticated?(
    <Navigate to="/"/>
  ):(
    <Navigate to="/login"/>
  )
}

export default App
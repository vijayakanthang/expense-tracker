import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import ExpenseList from './components/ExpenseList'
import axios from 'axios'


function App() {
 

  return (
    <div className='main'> 
    <div className='one'><Header/></div>
    <div className='two'><ExpenseList/></div>
   
   </div>
  )
}

export default App

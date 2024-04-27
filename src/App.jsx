import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Userlist from './components/Userlist'
import axios from 'axios'


function App() {
 

  return (
    <div className='main'> 
    <div className='one'><Header/></div>
    <div className='two'><Userlist/></div>
   
   </div>
  )
}

export default App

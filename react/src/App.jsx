import React from 'react'
import './App.css'
import { BrowserRouter,Routes
  ,Route } from 'react-router-dom'
import axios from 'axios'
import {Toaster} from 'react-hot-toast' // It give the accsess to send the notification to the fontend whether user is regiseter or login

import Dashboard from './dashboard'
import Registration from './registration'
import Login from './login'
axios.defaults.baseURL= 'http://localhost:3000/'
axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json';
import { UserContextProvider } from './context/UserContext'



const App = () => {
  return (
    <BrowserRouter>
   <UserContextProvider>
    <Toaster position='bottom-right' toastOptions={{duration:2000}}/>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
   </UserContextProvider>
      </BrowserRouter>
  )
}

export default App

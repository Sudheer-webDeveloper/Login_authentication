import React from 'react'
import { UserContext } from './context/UserContext'
import { useContext } from 'react'

const Dashboard = () => {

  const {user} = useContext(UserContext)
  console.log("user from dashboard",user)
  return (
    <div>
      <h1>dashboard page</h1>
       { user?<h1>!{user.name}</h1> : <h2>Hello world</h2> }

    </div>
  )
}

export default Dashboard

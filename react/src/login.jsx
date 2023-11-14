import React from "react";
import { useState } from "react";
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import {toast }from "react-hot-toast"
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChanging = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const loginSubmit = async(e) => {
    e.preventDefault();
     const {email,password} = data;

     try {
      const {data} = await axios.post("/login",{email, password})
      console.log("login Data", data)

      if(data.error){
         toast.error(data.error)
      }
      else{
        setData({})
        navigate("/dashboard")
      }
     } catch (error) {
      console.log("error form frontedn login",error)
     }

  };

  return (
    <div>
      <nav>
        <NavLink to="/">Registration</NavLink>
        <br />
        <NavLink to="/login">login</NavLink>
        <br />

        <NavLink to="/dahsboard">Dahboard</NavLink>
        <br />

      </nav>
      <div>
        <form onSubmit={loginSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="eamil"
            name="email"
            id="email"
            value={data.email}
            onChange={onChanging}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={onChanging}
          />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

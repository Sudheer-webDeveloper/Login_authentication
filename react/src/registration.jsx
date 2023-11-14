import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onchange = (e) => {
    const { value, name } = e.target;
    setData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };





   const registrationSubmit = async(e) =>{
    e.preventDefault()
   const {name,email,password} = data
    console.log("our fronted",data)
   try {
    const {data} = await axios.post('/register',{name:name,email:email,password:password}) 
    //const { data } = await axios.post('/register', { name: name, email: email, password: password });: Sends a POST request to /register endpoint using Axios, passing an object with name, email, and password as the payload. It awaits the response and destructures the data property from the response object.
    console.log("see here",data)
   if(data.error){
    toast.error(data.error)
   }
   else{
      setData({})
      toast.success("Registation Successful")
      navigate('/login')
   }

   } catch (error) {
    console.log(error,"error from frontend")
   }
}


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
      <form onSubmit={registrationSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={data.name}
          onChange={onchange}
        />
        <label htmlFor="email">email</label>
        <input
          type="eamil"
          name="email"
          id="email"
          value={data.email}
          onChange={onchange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={data.password}
          onChange={onchange}
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Registration;

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});
export const UserContextProvider = ({ children }) => {

  const [user,setUser] = useState(null)

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then((data) => {
         console.log("Data",data.data) // comment out and see the output then you will unserstand
        setUser(data.data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
  )
};

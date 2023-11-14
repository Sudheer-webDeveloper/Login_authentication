
const User = require('../models/user')
const  {hashingPassword,comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')


const test = (req,res)=>{
    res.json("test is working")
}

const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body
       // check if name is there or not

       if(!name){
        return res.json({
            error:"Name must require"
        })
       }
       if(!password || password.length < 6){
        return res.json({
            error:"password require and must contain 6 characters"
        })
       };
        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error:"Email already exist"
            })
        }

        const hashedPassoword = await hashingPassword(password)
        const user = await User.create({
            name,email,password:hashedPassoword //Creating the user if user not exists {name:name,email:email,password:password}
        })
        return res.json(user)
    
    } catch (error) {
        console.log("We get an error",error)
    }
}


const loginUser = async(req,res) =>{
    try {
        const {email,password} = req.body
        

        // check user exsists or not
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error:'No user found with this email please register'
            })
        }

        // if user exsists with the email what he provided then it compares the exsisting passowrd there in database and the password what he was giving now
        const match = await comparePassword(password,user.password)
        if(match){
        //    res.json("password match")

        jwt.sign({email:user.email,id:user._id,name:user.name},process.env.JWT_SECRET , {},(err,token)=>{
            if(err) throw err;
            console.log("token",token)
            res.cookie('token',token).json(user)
        })
        }
        if(!match){
            res.json({
                error:"password dosent't match re-register"
            })
        }
        
        // if passwords matches we are going to generate the wob token to track the user entire web applicationc



    } catch (error) {
         console.log("error from login", error)
    }   
}


// for usecontext in the frontend to use the user in the entire application

const getProfile = (req,res)=>{
    const {token} = req.cookies  // in the login route we send the all the data to the cookie , now we are accsessing the data from the cookie and sending it to the frontend

    if(token){
        jwt.verify(token,process.env.JWT_SECRET ,{},(err,user)=>{
            if(err) throw err ;
            console.log("user",user)
            res.json(user)  // if user exsist and token matches the useeffect will give this user to the frontend on every render 
        })
    }
    else{
        res.json(null)  
    }
}




module.exports = {test,registerUser,loginUser,getProfile}











/* ---> before not hashing the password


const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body
       // check if name is there or not

       if(!name){
        return res.json({
            error:"Name must require"
        })
       }
       if(!password || password.length < 6){
        return res.json({
            error:"password require and must contain 6 characters"
        })
       };
        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error:"Email already exist"
            })
        }


        const user = await User.create({
            name,email,password  //Creating the user if user not exists {name:name,email:email,password:password}
        })
        return res.json(user)
    
    } catch (error) {
        console.log("We get an error",error)
    }
}



*/



/*

JSON Web Tokens (JWT) are a popular method for securely transmitting information between parties as a JSON object. In your example, `jwt.sign()` is used to create a JWT token based on the user's information (`email`, `id`, `name`) and a secret key (`process.env.JWT_SECRET`).

Here's a breakdown of JWT and why it's commonly used:

1. **Security**: JWTs are signed using a secret key known only to the server. This signature ensures that the token hasn't been tampered with, providing a level of trust between the server and the client.

2. **Stateless Authentication**: JWTs enable stateless authentication, meaning the server doesn't need to keep track of the user's session in memory or a database. Instead, the token itself contains the necessary information to identify and authenticate the user. This scalability advantage allows systems to handle more users without storing session-specific data on the server.

3. **Compactness**: JWTs are lightweight and compact, making them easy to transmit over the network. They can be sent in HTTP headers, URLs, or within the body of a request.

Regarding your question about sending the JWT in a cookie:

Using a cookie to store the JWT has a few advantages:

- **Security**: Cookies can have security flags like `HttpOnly` and `Secure`, ensuring they are only transmitted over encrypted connections and not accessible to client-side JavaScript, thus reducing the risk of XSS attacks.
  
- **Automatic Sending**: Cookies are automatically sent by the browser with subsequent requests to the same domain, making them convenient for handling authentication without manual attachment in every request.

- **Expiration**: Cookies can have expiration times, allowing JWTs to have limited lifespans, enhancing security.

To summarize, sending the JWT via a cookie offers security enhancements (like `HttpOnly` and `Secure` flags), automatic transmission with each request to the server, and controlled expiration, making it a commonly used method for handling authentication tokens in web applications.


*/
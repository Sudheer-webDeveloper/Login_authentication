const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))


const {mongoose} = require("mongoose")
const router = require('./routes/appRoute')


//database connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Database connected successfully"))
.catch((err)=>console.log("databse not connected",err))


// Order matters when using middle ware 
app.use(express.json()) // It will parse the data which is coming from the fronted 

app.use("/",router)
app.listen(3000,()=>console.log("connected successfully 3000"))






















/*



const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  };
app.use(cors(corsOptions))





`cookie-parser` is a middleware used in Node.js/Express applications to parse cookies attached to the incoming request from the client and make them accessible within the server-side code.

Here's a brief overview of what `cookie-parser` does:

1. **Parsing Cookies**: When a client sends a request to the server, it often includes cookies containing information like authentication tokens, user preferences, session IDs, etc. `cookie-parser` intercepts this request and parses these cookies, making their values available in a JavaScript object (`req.cookies`) within the Express request object.

2. **Convenience**: It simplifies working with cookies by abstracting away the complexities of parsing and extracting values from the cookie headers manually. Developers can easily access cookie values using the `req.cookies` object, which contains key-value pairs of the cookie data.

3. **Usage**: By using `cookie-parser`, developers can read, modify, or set cookies for tasks such as authentication, session management, storing user preferences, tracking user behavior, etc.

4. **Configuration**: Additionally, it allows for configuration options such as setting the secret for signed cookies, enabling various options for parsing, and more, enhancing its flexibility and security.

Overall, `cookie-parser` streamlines the handling of cookies in an Express application, making it easier to manage and utilize the data stored in client-side cookies within the server-side code.

*/
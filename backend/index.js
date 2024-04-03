import express, { response }  from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose'
import { Book } from "./models/bookModel.js";
import bookRoute from "./route/bookRoutes.js";
import cors from 'cors'

const app = express()

// Middleware for parsing router body
app.use(express.json())


app.use(cors())
// Middleware for handling CORS policy

// app.use(    
//     cors({
//         origin: 'http://localhost:5137', 
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// )

// Routes
app.use('/books', bookRoute)

// Mongoose for connecting to mongoDB Database
mongoose
    .connect(mongoDBURL)
    .then( () => {
        console.log("MongoDB connected")
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`))
    })
    .catch((error) => console.log(error))



// Hello World Testing 
app.get("/", (req, res) => {
    console.log(req)
    return res.status(200).send("Hello World!")
} )


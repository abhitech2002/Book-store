import express, { response }  from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose'
import { Book } from "./models/bookModel.js";
import bookRoute from "./route/bookRoutes.js";

const app = express()

// Middleware for parsing router body
app.use(express.json())

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


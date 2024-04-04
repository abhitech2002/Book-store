import express  from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router()

// post  a new book to the database
router.post('/', async(req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        )
        {
            return  res.status(400).send({
                message: error.message
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book)
    }
    
    catch (error) {
        console.log(error.message)
        return res.status(500).send({message: error.message})
    }
})

//  get all books
router.get('/', async(req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).send({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})

//  get all books
router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id)
        return res.status(200).json(book)
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})

// Update the book
router.put('/:id', async(req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
        })
        }

        const {id} = req.params
        const result  = await Book.findByIdAndUpdate(id, req.body)
        if(!result) {
            return res.status(404).send({message: 'Book not found...'})
        }

        return res.status(200).send({message: 'Book Updated Sucessfully...'})

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})


// Delete the book
router.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id)
        if(!result){
            res.status(404).send({message:"Book Not Found...."})
        }
        return res.status(200).send({message: "Books Deleted Successfully..."})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})


export default router
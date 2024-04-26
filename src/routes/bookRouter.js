import { Router } from "express";
import { createABook, deleteBook, getAllBooks, getOneBook, searchBooks, updateOneBook } from "../controllers/bookController";
import { authAdmin } from "../middleware/auth";

export const bookRouter = Router();

bookRouter.get('/all', getAllBooks)
bookRouter.get('/oneBook/:id', getOneBook)
bookRouter.post('/create',authAdmin, createABook)
bookRouter.put('/update/:id',authAdmin, updateOneBook)
bookRouter.delete('/delete/:id', authAdmin, deleteBook)
bookRouter.post("/search", searchBooks);
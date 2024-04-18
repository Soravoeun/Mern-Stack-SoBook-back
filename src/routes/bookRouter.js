import { Router } from "express";
import { createABook, deleteBook, getAllBooks, getOneBook, searchBooks, updateOneBook } from "../controllers/bookController";
import { authAdmin } from "../middleware/auth";

export const bookRouter = Router();

bookRouter.post('/create',authAdmin, createABook)
bookRouter.get('/oneBook/:id', getOneBook)
bookRouter.get('/all', getAllBooks)
bookRouter.put('/update/:id',authAdmin, updateOneBook)
bookRouter.delete('/delete/:id', authAdmin, deleteBook)
bookRouter.post("/search", searchBooks);
import { Router } from "express";
import { authStandard } from "../middleware/auth";

import { favoriteBook, getFavoriteBook, removeFavoriteBook } from "../controllers/favoritesController";

export const favoriteRouter = Router();

favoriteRouter.get("/allBooks", authStandard, getFavoriteBook);
favoriteRouter.post("/book", authStandard, favoriteBook);
favoriteRouter.delete("/delete/:bookId", authStandard, removeFavoriteBook);

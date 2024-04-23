import { Router } from "express";
import { authStandard } from "../middleware/auth";
import { getReservationBook, removeBookFromReservation, reservationBook } from "../controllers/reservationController";

export const reservationRouter = Router();

reservationRouter.post("/books", authStandard, reservationBook);
reservationRouter.get("/allBooks", authStandard, getReservationBook);
reservationRouter.delete("/delete/:id",authStandard, removeBookFromReservation);
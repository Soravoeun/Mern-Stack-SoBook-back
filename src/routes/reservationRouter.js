import { Router } from "express";
import { authStandard } from "../middleware/auth";
import { reservationBook } from "../controllers/reservationController";

export const reservationRouter = Router();

reservationRouter.post("/books", authStandard, reservationBook);

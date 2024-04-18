import { Router } from "express";
import {
  allUsers,
  createUser,
  inscription,
  login,
  removeUser,
} from "../controllers/userController";
import { authAdmin } from "../middleware/auth";

export const userRouter = Router();

userRouter.get("/all", allUsers);
userRouter.post("/inscription", inscription);
userRouter.post("/login", login);
userRouter.post("/register", createUser);
userRouter.delete("/delete/:id",authAdmin, removeUser);

import { Router } from "express";
import { sendEmail } from ("../controllers/email.js");

export const router = Router();
router.post("/data", sendEmail);



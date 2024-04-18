import jwt from "jsonwebtoken";
import "dotenv/config";
import { response } from "../models/response";
import User from "../models/userModel";

export const authAdmin = async (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.json(
      response().error({ message: "Access non autorisé, token manquant" })
    );
  }
  const token = tokenHeader.split(" ")[1];

  try {
    const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedJwt.user;
    console.log(req.user);
    const user = await User.findOne({ _id: req.user });
    console.log(user);
    if (!user) {
      res.json(response().error({ message: "User unknown" }));
    }
    if (!user.isAdmin) {
      res.json(response().error({ message: "User denied" }));
    }
    next();
  } catch (error) {
    console.log(error);
    res.json(response().error({ message: "Token invalide" }));
  }
};

export const authStandard = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  const token = tokenHeader.split(" ")[1];

  if (!token) {
    return res.json(
      response().error({ message: "Access non autorisé, token manquant" })
    );
  }

  try {
    const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedJwt.user;
    next();
  } catch (error) {
    console.log(error);
    res.json(response().error({ message: "Token invalide" }));
  }
};

export const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return token;
};

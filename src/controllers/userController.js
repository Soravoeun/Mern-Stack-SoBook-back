import "dotenv/config";

import User from "../models/userModel";
import { generateToken } from "../middleware/auth";
import { response } from "../models/response";

export const createUser = async (req, res) => {
  try {
    const newUser = new User();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.zipcode = req.body.zipcode;
    newUser.isAdmin = false;
    newUser.password = await newUser.crypto(req.body.password);
    newUser.save();
    console.log("vous êtes connecté");
    res.json({ message: "Utilisateur a été créé avec success" });
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(
      users.map((user) => ({
        // toObject() est utilisée pour convertir un objet Mongoose en un objet JavaScript simple, sous forme JSON
        ...user.toObject(),
        fullName: user.fullName,
      }))
    );
  } catch (error) {
    res.status(400).json({ error: "All users not found" });
  }
};

export const login = async (req, res) => {
  // ajout des paramètres pour la verification du password avec le salt
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      // Si aucun utilisateur avec cet email n'est trouvé
      return res.json(response().error({ error: "Utilisateur non trouvé" }));
    }
   
    const verify = await user.verify(password, user.password);

    if (!verify) {
      const error = new Error("Invalid password");
      console.log(error);
      throw error;
    }
    const token = generateToken(user._id);
    console.log("token");
    res.json(
      response().success({
        message: "Vous êtes connecté",
        token,
        firstName: user.firstName,
        isAdmin: user.isAdmin,
      })
    );
  } catch (error) {
    res.json(response().error({ message: error.message }));
  }
};

export const inscription = async (req, res) => {
  try {
    const newUser = new User();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.isAdmin = false;
    newUser.zipcode = req.body.zipcode;
    newUser.password = await newUser.crypto(req.body.password);
    newUser.save();
    console.log("vous êtes connecté");
    // ajout du token
    // const token = generateToken(newUser);
    // ajout token dans le res.json
    res.json(
      response().success(
        {
        // token,
        // firstName: newUser.firstName,
        // isAdmin: newUser.isAdmin,
      })
    );
  } catch (error) {
    res.json(response().error({ message: error.message }));
  }
};

export const removeUser = async (req, res) => { 
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) { 
      return res.json(response().error({ message: "User not found" }));
    }
    return res.json(
      response().success({ message: "User deleted successfully" })
    );
  } catch (error) {
    res.json(response().error({ message: error.message }));
  }
}

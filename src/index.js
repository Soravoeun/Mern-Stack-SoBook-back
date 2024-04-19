import express from "express"; // Importation du module Express pour la gestion des routes HTTP
import "dotenv/config"; // Importation du module dotenv pour la gestion des variables d'environnement
import mongoose from "mongoose"; // Importation du module Mongoose pour la gestion de la base de données MongoDB
import { bookRouter } from "./routes/bookRouter"; 
import cors from "cors"; // Importation du module Cors pour gérer les requêtes cross-origin
import { userRouter } from "./routes/userRouter"; // Importation du routeur pour les utilisateurs
import { reservationRouter } from "./routes/reservationRouter";

main().catch((err) => console.log(err)); // Appel de la fonction principale

async function main() {
  await mongoose.connect(process.env.MONGODB_URI); // Connexion à la base de données MongoDB via Mongoose
  console.log(`[DATABSE] MongoDBSoBook is connected`); // Message de confirmation de connexion à la base de données
  // Utiliser `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` si votre base de données a une authentification activée
}

const app = express(); 
const port = process.env.PORT; 

// Autorisation de toutes les origines avec cors par défaut pour permet le control du nom de domaine
app.use(cors());
app.use(express.json()); // Utilisation du middleware pour analyser les données JSON des requêtes
app.use(express.urlencoded({ extended: false })); // Utilisation du middleware pour analyser les données encodées des requêtes

app.get("/", (req, res) => {
  // Route pour la page d'accueil
  return res.json("Welcome to SoBook Mern Stack"); 
});

app.use("/books", bookRouter); // Utilisation du routeur pour les routes relatives aux livres
app.use("/user", userRouter); // Utilisation du routeur pour les routes relatives aux utilisateurs
app.use("/reservation", reservationRouter); // Utilisation du routeur pour les routes

app.listen(
  port,
  () => console.log(`[SERVER] listening at http://localhost:${port}`) // Démarrage du serveur sur le port spécifié
);

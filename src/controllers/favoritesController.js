import Favorites from "../models/favoritesModel";
import { response } from "../models/response";

// savegarde du livre dans favoris
export const favoriteBook = async (req, res) => {
  try {
    // Vérification si l'utilisateur et le livre sont présents dans la requête
    if (!req.user || !req.body.book) {
      console.log(req.body.book);
      return res.json(
        response().error({
          message: "need all required fied : user, book",
        })
      );
    }
    // Recherche si le livre est déjà dans les favoris de l'utilisateur
    const existingFavorite = await Favorites.findOne({
      user: req.user,
      book: req.body.book,
    });

    // Si le livre est déjà dans les favoris, envoie un message d'erreur
    if (existingFavorite) {
      return res.json(
        response().error({
          message: "Livre déjà ajouté dans le favoris",
        })
      );
    }

    // Ajoute le livre aux favoris de l'utilisateur
    await Favorites.create({
      user: req.user,
      book: req.body.book,
    });

    // Renvoie un message de succès
    return res.json(
      response().success({ message: "Livre ajouté avec success dans favoris" })
    );
  } catch (err) {
    console.log(err.message);
    res.json(response().error({ message: err.message }));
  }
};


// recupère tous les livres du favoris du user connecté
export const getFavoriteBook = async (req, res) => {
  try {
    if (!req.user) {
      return res.json(
        response().error({
          message: "need all requied fied : user, book",
        })
      );
    }
    const currentFavoriteBook = await Favorites.find({ user: req.user });
    return res.json(response().success(currentFavoriteBook));
  } catch (err) {
    console.log(err.message);
    res.json(response().error({ message: err.message }));
  }
};

// supprimer le livre du favoris du user connecté
export const removeFavoriteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    if (!req.user || !bookId) {
      return res.json(
        response().error({
          message: "need all required fied : user, book",
        })
      );
    }
    const result = await Favorites.findOneAndDelete({user: req.user, book: bookId});
    if (!result) {
      return res.json(response().error({ message: "Book not fund" }));
    }

    return res.json(
      response().success({ message: "Livre supprimé du favoris avec success" })
    );
  } catch (err) {
    console.log(err.message);
    res.json(response().error({ message: err.message }));
  }
};

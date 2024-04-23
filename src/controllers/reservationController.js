import Reservation from "../models/reservationModel";
import { response } from "../models/response";

export const reservationBook = async (req, res) => {
  try {
    if (!req.user || !req.body.books) {
      return res.json(
        response().error({
          message: "need all requied fied : user, book",
        })
      );
    }
    let reservation;

    for (let i = 0; i < req.body.books.length; i++) {
      reservation = await Reservation.create({
        user: req.user,
        book: req.body.books[i],
      });
    }

    return res.json(response().success());
  } catch (err) {
    console.log(err.message);
    res.json(response().error({ message: err.message }));
  }
};

export const getReservationBook = async (req, res) => {
  try {
    if (!req.user) {
      return res.json(
        response().error({
          message: "need all requied fied : user, book",
        })
      );
    }
    const currentReservationBook = await Reservation.find({ user: req.user });
    return res.json(response().success(currentReservationBook));
  } catch (err) {
    console.log(err.message);
    res.json(response().error({ message: err.message }));
  }
};


export const removeBookFromReservation = async (req, res) => {
  try {
    // Vérifie si l'utilisateur et le livre sont présents dans la requête
    const { bookId } = req.params;
    if (!req.user || !bookId) {
      return res.json(
        response().error({
          message: "need all required fields: user, book",
        })
      );
    }

    // Recherche la réservation du livre pour l'utilisateur actuel
    const reservation = await Reservation.findOneAndDelete({
      user: req.user,
      book: bookId,
    });

    // Si la réservation est trouvée et supprimée, renvoie un message de succès
    if (reservation) {
      return res.json(
        response().success({
          message: "Book removed successfully from reservation",
        })
      );
    } else {
      // Si aucune réservation correspondante n'est trouvée, renvoie un message d'erreur
      return res.json(
        response().error({
          message: "Book not found in current reservation",
        })
      );
    }
  } catch (err) {
    console.log(err.message);
    res.json(response().error({ message: err.message }));
  }
};

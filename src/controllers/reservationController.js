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
              user: req.user._id,
              book : req.body.books[i],
          })
      }

    return res.json(response().success());
  } catch (err) {
    console.log(err.message);
    res.json(response().error({ message: err.message }));
  }
};

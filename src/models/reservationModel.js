import mongoose, { Schema, model } from "mongoose";

const reservationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  book: { type: Schema.Types.ObjectId, ref: "Book" },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;

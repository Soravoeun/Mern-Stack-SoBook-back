import mongoose, { Schema, model } from "mongoose";

const favoriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  book: { type: Schema.Types.ObjectId, ref: "Book" },
});

const Favorites = mongoose.model("Favorites", favoriteSchema);

export default Favorites;

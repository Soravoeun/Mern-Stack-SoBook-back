import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true, //remove space before and after in a typing
  },
  lastName: {
    type: String,
    true: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    min: [1000, "Code Postal est trop court"],
    max: 99999,
  },

  isAdmin: {
    type: Boolean,
    défault: false,
  },
  //
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  favoriteBooks: [
    {
      type: [],
    },
  ],
});

//ajout dans le schema le moyen de caché le password avec salt et hash de bcrypt
userSchema.methods.crypto = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

// ajout de la methode verification du password
userSchema.methods.verify = async (password, oldPassword) => {
  const result = await bcrypt.compare(password, oldPassword);
  console.log("vérification du password");
  return result;
};

const User = mongoose.model("User", userSchema);

export default User;

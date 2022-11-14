const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
      unique: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Phone: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);

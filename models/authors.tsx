import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    name: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const author = mongoose.models.Author || mongoose.model("Author", schema);

export default author;

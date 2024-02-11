import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    title: String,
    content: String,
    author: String,
  },
  {
    timestamps: true,
  }
);

const article = mongoose.models.Article || mongoose.model("Article", schema);

export default article;

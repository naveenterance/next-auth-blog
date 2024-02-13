import mongoose, { Schema, models } from "mongoose";

const authorsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Authors = models.Authors || mongoose.model("Authors", authorsSchema);
export default Authors;

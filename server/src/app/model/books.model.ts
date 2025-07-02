import { model, Schema } from "mongoose";
import { Books } from "../interface/books.interface";
import { Borrow } from "./borrow.model";

const bookSchema = new Schema<Books>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, min: 0 },
    available: { type: Boolean },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.pre("save", async function(doc) {
  if (this.copies === 0) {
    this.available = false;
  } else {
    this.available = true;
  }
});

bookSchema.post("findOneAndDelete", async function(doc) {
  if (doc) {
    await Borrow.deleteMany({ book: doc._id });
  }
});

export const Book = model("Book", bookSchema);

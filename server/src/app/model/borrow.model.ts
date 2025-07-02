import { model, Schema } from "mongoose";
import { BorrowBooks } from "../interface/borrow.interface";
import { Book } from "./books.model";

const borroBook = new Schema<BorrowBooks>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borroBook.pre("save", async function(next) {
  const bookCopies = await Book.findOne({ _id: this.book });
  if (bookCopies?.copies === 0) {
    return next(new Error("Sorry stock in not avaiable"));
  } else if (
    (bookCopies?.copies as number) < this.quantity ||
    this.quantity === 0
  ) {
    return next(new Error(`Sorry stock is ${bookCopies?.copies} avaiable`));
  }
  next();
});

borroBook.post("save", async function(next) {
  const quantity = this.quantity;
  if (quantity) {
    const bookData = await Book.findById({ _id: this.book });
    await Book.findByIdAndUpdate(
      { _id: this.book },
      {
        copies: (bookData?.copies as number) - quantity,
        available: (bookData?.copies as number) - quantity === 0 ? false : true,
      },
      { new: true }
    );
  }
});

export const Borrow = model("Borrow", borroBook);

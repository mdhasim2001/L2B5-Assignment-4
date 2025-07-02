import { Types } from "mongoose";

export interface BorrowBooks {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

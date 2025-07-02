"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const books_model_1 = require("./books.model");
const borroBook = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, default: Date.now },
}, {
    versionKey: false,
    timestamps: true,
});
borroBook.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookCopies = yield books_model_1.Book.findOne({ _id: this.book });
        if ((bookCopies === null || bookCopies === void 0 ? void 0 : bookCopies.copies) === 0) {
            return next(new Error("Sorry stock in not avaiable"));
        }
        else if ((bookCopies === null || bookCopies === void 0 ? void 0 : bookCopies.copies) < this.quantity ||
            this.quantity === 0) {
            return next(new Error(`Sorry stock is ${bookCopies === null || bookCopies === void 0 ? void 0 : bookCopies.copies} avaiable`));
        }
        next();
    });
});
borroBook.post("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const quantity = this.quantity;
        if (quantity) {
            const bookData = yield books_model_1.Book.findById({ _id: this.book });
            yield books_model_1.Book.findByIdAndUpdate({ _id: this.book }, {
                copies: (bookData === null || bookData === void 0 ? void 0 : bookData.copies) - quantity,
                available: (bookData === null || bookData === void 0 ? void 0 : bookData.copies) - quantity === 0 ? false : true,
            }, { new: true });
        }
    });
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borroBook);

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBook = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../model/borrow.model");
exports.borrowBook = express_1.default.Router();
exports.borrowBook.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrow = req.body;
        const data = yield borrow_model_1.Borrow.create(borrow);
        res.status(201).send({
            success: true,
            message: "Book borrowed successfully",
            data,
        });
    }
    catch (error) {
        res.status(404).send({
            success: false,
            error,
        });
    }
}));
exports.borrowBook.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield borrow_model_1.Borrow.aggregate([
            {
                $lookup: {
                    from: "books",
                    localField: "book",
                    foreignField: "_id",
                    as: "book",
                },
            },
            { $unwind: "$book" },
            {
                $group: {
                    _id: {
                        title: "$book.title",
                        isbn: "$book.isbn",
                    },
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$_id.title",
                        isbn: "$_id.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        // const data = await Borrow.find().populate("book");
        res.status(200).send({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(404).send({
            success: false,
            error,
        });
    }
}));

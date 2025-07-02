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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../model/books.model");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyBook = req.body;
        const data = yield books_model_1.Book.create(bodyBook);
        res.status(201).send({
            success: true,
            massage: "Book created successfully",
            data,
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: "Book created not successfully",
            error,
        });
    }
}));
// /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
exports.bookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        let data = [];
        if (filter) {
            data = yield books_model_1.Book.find({ genre: filter })
                .sort({ [sortBy]: sort })
                .limit(limit);
        }
        else {
            data = yield books_model_1.Book.find();
        }
        res.status(200).send({
            success: true,
            message: "All books find",
            data,
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: "All books not find",
            error,
        });
    }
}));
exports.bookRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.params.bookId;
        const data = yield books_model_1.Book.findById(book);
        res.status(200).send({
            success: true,
            message: "Book retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: "Book retrieved not successfully",
            error,
        });
    }
}));
exports.bookRoutes.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const bookBody = req.body;
        const data = yield books_model_1.Book.findByIdAndUpdate(bookId, bookBody, { new: true });
        res.status(200).send({
            success: true,
            message: "Book updated successfully",
            data,
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: "Book updated not successfully",
            error,
        });
    }
}));
exports.bookRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.params.bookId;
        yield books_model_1.Book.findOneAndDelete({ _id: book });
        res.status(201).send({
            success: true,
            message: "Book delete successfully",
            data: null,
        });
    }
    catch (error) {
        try {
        }
        catch (error) {
            res.status(400).send({
                success: false,
                message: "Book updated not successfully",
                error,
            });
        }
    }
}));

import { createBrowserRouter } from "react-router";
import App from "../App";
import { Books } from "@/pages/Books";
import { AddBook } from "@/pages/AddBook";
import { Borrow } from "@/pages/Borrow";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Books,
      },
      {
        path: "/books",
        Component: Books,
      },
      {
        path: "addBook",
        Component: AddBook,
      },
      {
        path: "borrow",
        Component: Borrow,
      },
    ],
  },
]);

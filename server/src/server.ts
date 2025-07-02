import mongoose from "mongoose";
import { app } from "./app";
require("dotenv").config();

const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(`${process.env.BATABASE_KEY}`);

    console.log("connect to database");

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

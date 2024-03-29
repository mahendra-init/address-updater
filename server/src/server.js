import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

await connectDB();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

import express from "express"
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js" 
import cors from "cors"
import path from "path";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();
const app = express()
const __dirname = path.resolve();

//midddleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes" , notesRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


connectDB().then(() => {
    app.listen(process.env.PORT,() =>{
    console.log("Server started on port:" , process.env.PORT);
});
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});


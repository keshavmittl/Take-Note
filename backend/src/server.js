import express from "express"
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js" 
import cors from "cors"
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();
const app = express()

//midddleware

app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes" , notesRoutes);


connectDB().then(() => {
    app.listen(process.env.PORT,() =>{
    console.log("Server started on port:" , process.env.PORT);
});
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});


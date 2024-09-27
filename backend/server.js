import express from "express"
import dotenv from "dotenv";
import {connectDB} from "./config/db.js"
import productRoutes from "./routes/product.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT

//this is middleware that allows us to parse the req.body and convert it to a JSON object
//It also makes the data available (after parsing) to the req.body object
//the middleware ensure that req.body contains the parsed JSON, data can be accessed.
//Without express.json the req.body would be undefined when receiving JSON Data
app.use(express.json());

// /api/products will be appended to all the routes in productRoutes.
//Before the routes were app.get("/api/products/.."), but with routes we're simplifing
//the code so it looks cleaner
app.use("/api/products",productRoutes)

//The console.log will appear in the terminal.
//spent 10 min trying to find the message in the dev tools log
app.listen(PORT, () =>{
    connectDB();
    console.log("Server is now running on http://localhost:" + PORT)
})


import express from "express"
import dotenv from "dotenv";
import {connectDB} from "./config/db.js"

const app = express();
dotenv.config();

app.get('/products', (req,res) => {
    res.send("Serverdvdready")
})

//The console.log will apear in the terminal.
//spent 10 min trying to find the message in the dev tools log
app.listen(5000, () =>{
    connectDB();
    console.log("Server is running on http://localhost:5000")
})


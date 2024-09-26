import express from "express"
import dotenv from "dotenv";
import {connectDB} from "./config/db.js"
import Product from "./Models/product.model.js";
import mongoose from "mongoose";

const app = express();
dotenv.config();

//this is middleware that allows us to parse the req.body and convert it to a JSON object
//It also makes the data available (after parsing) to the req.body object
//the middleware ensure that req.body contains the parsed JSON, data can be accessed.
//Without express.json the req.body would be undefined when receiving JSON Data
app.use(express.json());

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({}) // the empty braces means all items
        res.status(200).json({success:true, data: products})
    } catch (error) {
        console.log("error in fetching products: ", error.message)
        res.status(500).json({success:false, message: "Server Error"})
    }
})

app.post('/api/products', async (req,res) => {
    const product = req.body //user will send this data. 

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    } 
    catch (error) {
        console.error("Error in Create product: ", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }

})

//By default, findOneAndUpdate() returns the document as it was before update was applied. 
//If you set new: true, findOneAndUpdate() will instead give you the object after update 
//was applied.
app.put("/api/products/:id", async (req,res) =>{
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false, message:"Invalid Product ID"})
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product,{new:true})
        res.status(200).json({success:true, message:updatedProduct})
    } catch (error) {
        res.status(500).json({success:false, message:"Product not found"})
    }
})

app.delete("/api/products/:id", async (req, res) => {
    const {id}  = req.params
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted"})
    } catch (error) {
        console.error("Error in deleting product: ", error.message);
        res.status(404).json({success: false, message:"Product not found"})
    }

})

//The console.log will appear in the terminal.
//spent 10 min trying to find the message in the dev tools log
app.listen(5000, () =>{
    connectDB();
    console.log("Server is now running on http://localhost:5000")
})


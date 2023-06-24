import express from "express";
import Product from "../models/product.js";
import User from "../models/user.js";
import Review from "../models/review.js";
import data from "../data.js";

const seedRouter = express.Router()

seedRouter.get("/products", async (req, res) => {
    await Product.remove({})
    const insertedProducts = await Product.insertMany(data.products)
    res.send(insertedProducts)
})

seedRouter.get("/users", async (req, res) => {
    const users = await User.deleteMany({})
    const insertedUsers = await User.insertMany(data.users)
    res.status(201).json(insertedUsers)
})

seedRouter.delete("/reviews", async (req, res) => {
    const reviews = await Review.deleteMany({})
    res.json(reviews)
})

export default seedRouter
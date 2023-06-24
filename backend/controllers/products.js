import express from 'express'

const productsRouter = express.Router()
import Product from '../models/product.js'

productsRouter.get("/", async (req, res, next) => {
    const products = await Product.find({})
    res.json(products)
})

productsRouter.get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id).populate({
        path: "reviews",
        populate: { path: "user"}
    })
    res.json(product)
})

export default productsRouter
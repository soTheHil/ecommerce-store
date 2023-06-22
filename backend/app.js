import express from "express";
import 'express-async-errors'
import data from "./data.js";
import "dotenv/config.js"
import cors from "cors"
import mongoose from "mongoose";
import middleware from "./utils/middleware.js";
import seedRouter from "./controllers/seedProducts.js";
import Product from "./models/product.js";
import usersRouter from "./controllers/users.js";
import productsRouter from "./controllers/products.js";
import ordersRouter from "./controllers/orders.js";

const app = express()

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to mongoDB")
    })
    .catch(() => {
        console.log("Error connect")
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/seed", seedRouter)
app.use("/api/users", usersRouter)
app.use("/api/products", productsRouter)
app.use("/api/orders", ordersRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

export default app
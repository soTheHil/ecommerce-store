import express from "express";
import data from "./data.js";

const app = express()

app.get("/api/products", (req, res) => {
    res.send(data)
})

app.get("/api/products/:id", (req, res) => {
    const item = data.find(i => i.id === Number(req.params.id))
    console.log(item, 'item')
    res.send(item)
})

const PORT = process.env.PORT || 3001
app.listen(3001, () => {
    console.log(`Server running at port http://localhost:${PORT}`)
})
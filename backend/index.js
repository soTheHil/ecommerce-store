import app from "./app.js"

const PORT = process.env.PORT || 3001
app.listen(3001, () => {
    console.log(`Server running at port http://localhost:${PORT}`)
})
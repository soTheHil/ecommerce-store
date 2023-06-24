import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    category: String,
    description: String,
    price: { type: Number, required: true },
    foodRating: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
})

productSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Product = mongoose.model('Product', productSchema)
export default Product
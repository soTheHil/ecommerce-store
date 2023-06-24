import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    comment: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
})

reviewSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.createdAt = returnedObject.createdAt.toDateString()
        delete returnedObject.__v
    }
})

const Review = mongoose.model('Review', reviewSchema)
export default Review
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            title: String,
            url: String,
            price: Number,
            quantity: Number,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            }
        }
    ],
    address: String,
    itemsCost: Number,
    deliveryCost: Number,
    totalCost: Number,
    delivered: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

orderSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.createdAt = returnedObject.createdAt.toDateString()
        delete returnedObject.__v
    }
})

const Order = mongoose.model('Order', orderSchema)
export default Order
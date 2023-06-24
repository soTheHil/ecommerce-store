import express from 'express'
import Review from '../models/review.js'
import Product from '../models/product.js'
import { isAuth } from '../utils/middleware.js'

const reviewsRouter = express.Router()

reviewsRouter.post("/:id", isAuth, async (req, res) => {
    const product = await Product.findById(req.params.id).populate("reviews")

    const newReview = new Review({
        rating: req.body.rating,
        comment: req.body.comment,
        product: product._id,
        user: req.user._id
    })

    const review = await newReview.save()
    product.reviews = product.reviews.concat(review)
    const allReviews = product.reviews.reduce((a, c) => { return a + c.rating }, 0)
    const averageRating = Math.round(allReviews / product.reviews.length * 10) / 10
    product.foodRating = averageRating
    const returnedProduct = await product.save()

    res.json(returnedProduct)
})

reviewsRouter.get("/:id", async (req, res) => {
    const review = await Review.findById(req.params.id)
    res.json(review)
})

export default reviewsRouter
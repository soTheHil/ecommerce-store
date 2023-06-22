import express from 'express'
import Order from '../models/order.js'
import { isAuth } from '../utils/middleware.js'

const ordersRouter = express.Router()

ordersRouter.post(
    "/",
    isAuth,
    async (req, res) => {
        console.log(req.body)
        const newOrder = new Order({
            orderItems: req.body.orderItems.map(i => ({ ...i, product: i.id })),
            itemsCost: req.body.itemsCost,
            deliveryCost: req.body.deliveryCost,
            totalCost: req.body.totalCost,
            address: req.body.address,
            user: req.user
        })
        const order = await newOrder.save()
        res.send({message: "Order successful", order})
})

ordersRouter.get(
    "/",
    isAuth,
    async (req, res) => {
        const orders = await Order.find({user: req.user._id})
        res.send(orders)
})

export default ordersRouter
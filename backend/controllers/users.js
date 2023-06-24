import User from "../models/user.js";
import bcrypt from "bcrypt"
import express from "express"
import { generateToken } from "../utils/other.js";

const usersRouter = express.Router()

usersRouter.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json(user)
})

usersRouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body
    const existUser = await User.findOne({ email })
    if (existUser) return res.status(401).send({ message: 'Email address already exists'})
    const newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 9)
    })

    const user = await newUser.save()

    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user)
    })
})

usersRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            res.send({
                _id: user._id,
                email: user.email,
                name: user.name,
                token: generateToken(user)
            })
            return
        }
    }
    res.status(401).send({ message: 'Invalid email or password'})
})

export default usersRouter
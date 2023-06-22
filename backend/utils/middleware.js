import jwt from "jsonwebtoken"

const requestLogger = (req, res, next) => {
    console.log("Method:", req.method)
    console.log("Path", req.path)
    console.log("Body:", req.body)
    console.log("---")
    next()
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization
    if (authorization) {
        const token = authorization.slice(7)
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({message: 'Invalid Token'})
            }
            else {
                req.user = decode
                next()
            }
        })
    } else {
        res.status(401).send({message: "No Token"})
    }
}

const errorHandler = (err, req, res, next) => {
   res.status(500).json({message: err.message})
   next(err)
}

const unknownEndpoint = (req, res, next) => {
    res.status(404).send({error: "unknown endpoint"})
}

export default { requestLogger, unknownEndpoint, errorHandler }


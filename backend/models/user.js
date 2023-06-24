import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true}
}) 

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
        delete returnedObject.password
    }
})

const User = mongoose.model("User", userSchema)
export default User
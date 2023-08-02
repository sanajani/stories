import mongoose from 'mongoose'

const userModelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const UserModel = mongoose.model('user', userModelSchema)
export default UserModel
import UserModel from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const maxAge = 7 * 24 * 60 * 60;
import { createError } from '../middleware/createError.js';


export const registerUser = async (req, res, next) => {
    console.log(req.body);
    const {name, email, password} = req.body
    if(!name || !email || !password) next(createError(401, 'All the fields are required!'))
    const isUser = await UserModel.findOne({email})
    if(isUser) return next(createError(401, "User Already exist"))
    const hashPassword = await bcrypt.hash(password, 12)

    const newUser = new UserModel({
        name,
        email,
        password: hashPassword
    })

    try {
        await newUser.save()
        return res.status(201).json({message: 'Success', newUser})
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req, res, next) => {
    // console.log(req.body);
    const {email, password} = req.body
    if(!email || !password) return next(createError(400, "All the fileds are required !email login"))
    try {
        const newUser = await UserModel.findOne({email})
        if(!newUser) return next(createError(400, 'Invalid credintials'))
        const isValidUser = await bcrypt.compare(password, newUser.password)
        if(!isValidUser) return next(createError(401, 'Invalid credintials pass'))
        
        const token = jwt.sign({_id: newUser._id}, process.env.JWTSECRETKEY)
        res.cookie('tokenName',token,{
            httpOnly:true,
            expiresIn: '1d'
        })
        const user = await UserModel.findOne({email}).select('-password')

        res.status(200).json({user ,token})

    } catch (error) {
        next(error)
    }
}

export const isUserLogged = async (req,res,next) => {
    try {
        const user = await UserModel.findById(req.id).select('-password')
        res.status(200).json( user )
    } catch (error) {
        next(error)
    }
}


// export const logout = async (req, res, next) => {
//     res
//     .clearCookie("tokenName", {
//       sameSite: "none",
//       secure: true,
//     })
//     .status(200)
//     .send("User has been logged out.");
// }

export const logout = async (req,res,next) => {
    res
    .clearCookie('tokenName',{
        sameSite: 'none',
        secure: true
    })
    .status(200)
    .send("User has been logged out")
}
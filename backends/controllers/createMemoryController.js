import { createError } from '../middleware/createError.js';
import mongoose from 'mongoose';
import PostMessage from '../models/memoryModel.js';

// create memory controller
export const createMemory = async (req,res,next) => {
    const file = req?.file
    const {title, message, creator,creatorName, tags, createdTime} = req.body;
    if(!file || !message || !tags || !title) return createError(402 , "Please fill all the required fields")

    // image path sliced for database 
    let slicedFile = file.path.slice(6)

    const newPost = PostMessage({
        title,
        message,
        creator,
        tags,
        selectedFile: slicedFile,
        createdTime,
        creatorName
    })
    try {
        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        next(error)
    }
}

// gat all memory controller
export const getMemories = async (req, res, next) => {
    try {
    const getMemoriesVar = await PostMessage.find()
        
    return res.status(201).json({
        status: 'Success',
        data: getMemoriesVar
    })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

// get single memory controller console
export const getMemory = async (req,res,next) => {
    const {_id} = req.params
    try {
        const getMemoryVar = await PostMessage.findOne({_id:_id})
        console.log(getMemoryVar);
        return res.status(201).json( getMemoryVar )
    } catch (error) {
       next(error)
    }
}

// delete memory
export const deleteMemory = async (req,res, next) => {
    const {_id} = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) return createError(404,(`No post with id: ${_id}`));
    try {
        await PostMessage.findByIdAndDelete(_id)
        console.log('memory deleted');
        return res.status(200).json({message: 'Memory Deleted Successfully'})     
    } catch (error) {
        next(error)
    }
}

// update Memory
export const updateMemory = async (req,res,next) => {
    const {_id} = req.params
    // if (!mongoose.Types.ObjectId.isValid(_id)) return createError(404,(`No post with id: ${_id}`));
    const {title, message, tags, createdTime} = req.body;
    const file = req?.file

    // image path sliced for database
    let slicedFile = file?.path?.slice(6)

    try {
        const updatedMemory = { title, message, tags, selectedFile: slicedFile, _id: _id, createdTime };
        const updatememorytofrontend = await PostMessage.findByIdAndUpdate(_id,updatedMemory, {new: true})
        return res.status(200).json(updatememorytofrontend)
    } catch (error) {
        console.log(error);
    }
}

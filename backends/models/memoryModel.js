import { Schema, model } from 'mongoose'

const postSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    message:{
        type:String,
        required: true,
    },
    creator:{
        type:String,
    },
    creatorName:{
        type:String,
    },
    selectedFile:{
        type:String
    },
    tags:{
        type: [String]
    },
    createdTime: {
        type: String
    }
},{
    timestamps:true
})

const PostMessage = model("PostMemories",postSchema);
export default PostMessage

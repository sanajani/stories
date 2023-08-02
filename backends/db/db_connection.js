import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
mongoose.set('strictQuery', true);
// data base connections
const DBconnection = async () => {
    try {
        // await mongoose.connect("mongodb://localhost:27017/memorise")
        // 
        // await mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@memoriescluster.t7ywsm7.mongodb.net/?retryWrites=true&w=majority`)
        await mongoose.connect(`mongodb+srv://devsanajani:${process.env.DB_PASSWORD}@memoriescluster.t7ywsm7.mongodb.net/`)

        console.log("Connection Successfully");
    } catch (error) {
        console.log(error);
    }
}

export default DBconnection
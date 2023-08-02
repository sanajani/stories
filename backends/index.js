import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import DBconnection from './db/db_connection.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// import routes
import postRoutes from './routes/memoryRoute.js'
import userRoutes from './routes/usersRoute.js'
 
const app = express();

// env variables
const PORT = process.env.PORT || 8001
const frontendUrl = process.env.FRONTENDURL || 'http://localhost:3000'

// default middlewares
app.use(cors({credentials:true, origin:frontendUrl}));
app.use(morgan("dev"));
app.use(cookieParser({extends: true}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))

// use program routes
app.use('/posts',postRoutes)
app.use('/user',userRoutes)

app.use((err,req,res,next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!!!"
    return res.status(errorStatus).json({
        success: 'false',
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.listen(PORT,() => {
    DBconnection();
    console.log(`Your server is running on port http://localhost:${PORT}`);
})
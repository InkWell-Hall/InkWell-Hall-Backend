import  express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { inkWellHallRoute } from "./routers/inkWell-Hall_route.js";
import cors from 'cors';



const app = express();

app.use(express.json());

app.use(cors());



dotenv.config();

app.use('/api/v1',inkWellHallRoute);

const PORT = process.env.PORT || 5070;

const MONGOURI = process.env.MONGO_URI;

mongoose.connect(MONGOURI).then(()=>{
    console.log(`connected Successfully`);
    app.listen(PORT,()=>{
        console.log(`server is running on Port ${PORT}`);
    })
}).catch ((error)=> console.log(error));


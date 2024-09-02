import express from "express";
import dotenv from "dotenv";

import route from "./src/routes";

import db from "./src/libs/db";

import cors from "cors";
import userRoute from "./src/routes/UserRoute";
import followRoute from "./src/routes/FollowRoute";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// const corsOptions = {
//     origin: 'https://pctrn.vercel.app', // Allow requests from this origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allowed methods
//     allowedHeaders: 'Content-Type,Authorization', // Allowed headers
//     credentials: true, // If you need to include credentials like cookies
// }
app.use(cors({
    origin: 'https://pctrn.vercel.app', // Allowed origin
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allowed methods
    allowedHeaders: 'Content-Type, Authorization' // Allowed headers
}));

// app.options('*', cors(corsOptions));

app.use("/uploads",express.static("src/uploads"));

app.use(route);
app.use('/users', userRoute);
app.use('/api', followRoute);


app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello World!, coba2");
});

app.listen(port, async() => {

    try {
        await db.$connect()
        console.log(`Server berjalan pada port ${port}`);
    } catch (error) {
        await db.$disconnect()
    }
    
})
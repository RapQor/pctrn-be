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
app.use(cors());

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
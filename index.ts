import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello World!, coba2");
});

app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
})
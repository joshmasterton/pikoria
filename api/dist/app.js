import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { moviesSeriesRouter } from "./routes/moviesSeries.route.js";
import { startApi } from "./config/api.config.js";
dotenv.config();
const { PORT, NODE_ENV } = process.env;
export const app = express();
if (NODE_ENV !== "test") {
    startApi();
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (_req, res) => {
    res.send("Welcome to Pikoria");
});
app.use("/movies-series", moviesSeriesRouter);
if (NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Listening to server on port: ${PORT}`);
    });
}

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { moviesSeriesRouter } from "./routes/moviesSeries.route";
import { startApi } from "./config/api.config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: `${__dirname}/../dev.env` });

const { PORT } = process.env;
export const app = express();

startApi();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to Pikoria");
});

app.use("/movies-series", moviesSeriesRouter);

app.listen(PORT, () => {
  console.log(`Listening to server on port: ${PORT}`);
});

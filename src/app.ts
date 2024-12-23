import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors';
import router from "./app/routes";


const app: Application = express();


// parser
app.use(express.json())
app.use(cors())

// application routes
app.use('/api',router);

const getAController = (req: Request, res: Response) => {
  res.send("Blog Project server is running!");
};
app.get("/", getAController);

export default app;

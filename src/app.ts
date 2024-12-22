import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors';


const app: Application = express();


// parser
app.use(express.json())
app.use(cors())

// application routes
// app.use('/api/v1');

const getAController = (req: Request, res: Response) => {
  res.send("Blog Project server");
};
app.get("/", getAController);

export default app;

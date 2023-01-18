// Required External Modules
import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./src/items/items.router";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";

dotenv.config();

// Init Prisma 
const prisma = new PrismaClient()

// App Variables
if (!process.env.PORT) {
  process.exit(1)
}

const PORT = Number(process.env.PORT)||3000

const app: Express = express()

// App Configuration
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(helmet())
app.use(cors())
app.use(express.json())

// Server Activation
const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('server');
});

app.use("/api/menu/items", itemsRouter)
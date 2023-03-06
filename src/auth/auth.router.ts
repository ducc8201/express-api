import * as AuthService from "./auth.service";
import express, { Request, Response } from "express";
import { User } from "@prisma/client";

export const AuthRouter = express.Router();

// Login User
AuthRouter.post("/login", async (req: Request, res: Response) => {
  console.log(req.body)
  // AuthService.loginService(req.body);
  // res.status(201).json({message: 'success'})
});
// POST User/:id
import { Jwt } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

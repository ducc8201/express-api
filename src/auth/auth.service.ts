import { PrismaClient, User } from "@prisma/client";
// import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
// dotenv.config();

const prisma = new PrismaClient();

const generalAccessToken = (data: any) => {
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 60,
  });
  return accessToken;
};

const generalRefreshToken = (data: any) => {
  const access_token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: 60,
  });
  return access_token;
};

export const loginService = ({username, password}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user: User = await prisma.user.findUnique({
        where: { username: username },
      });
      console.log(user)
      if (user) {
        const checkPassword = bcrypt.compare(password, user.password);
        if (checkPassword) {
          const access_token = generalAccessToken({ id: user.id });
          const refresh_token = generalRefreshToken({ id: user.id });
          resolve({
            status: "OK",
            data: {
              access_token,
              refresh_token,
            },
          });
        }
        resolve({
          status: "err",
          message: "The user name or password is wrong",
        });
      } else {
        resolve({
          status: "err",
          message: "the user name is not existed",
        });
      }
    } catch (error) {
      console.log(error);
      reject({
        message: error,
        status: "err",
      });
    }
  });
};

export const refreshTokenService = (token: string) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user: User) => {
        if (err) {
          resolve({
            status: 404,
            message: "The user is not authentication",
          });
        }
        if (user) {
          const newAccessToken = generalAccessToken({ id: user.id });
          resolve({
            status: "OK",
            access_token: newAccessToken,
          });
        } else {
          resolve({
            status: "err",
            message: "The user is not authe,tication",
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

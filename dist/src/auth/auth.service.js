"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenService = exports.loginService = void 0;
const client_1 = require("@prisma/client");
const jwt = __importStar(require("jsonwebtoken"));
// dotenv.config();
const prisma = new client_1.PrismaClient();
const generalAccessToken = (data) => {
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 60,
    });
    return accessToken;
};
const generalRefreshToken = (data) => {
    const access_token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: 60,
    });
    return access_token;
};
const loginService = ({ username, password }) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    console.log(username);
    const user = yield prisma.user.findUnique({
        where: { username: username },
    });
    console.log(user);
    // if (user) {
    //   const checkPassword = bcrypt.compare(password, user.password);
    //   if (checkPassword) {
    //     const access_token = generalAccessToken({ id: user.id });
    //     const refresh_token = generalRefreshToken({ id: user.id });
    //     resolve({
    //       status: "OK",
    //       data: {
    //         access_token,
    //         refresh_token,
    //       },
    //     });
    //   }
    //   resolve({
    //     status: "err",
    //     message: "The user name or password is wrong",
    //   });
    // } else {
    //   resolve({
    //     status: "err",
    //     message: "the user name is not existed",
    //   });
    // }
    //   } catch (error) {
    //     console.log(error);
    //     reject({
    //       message: error,
    //       status: "err",
    //     });
    //   }
    // });
});
exports.loginService = loginService;
const refreshTokenService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
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
                }
                else {
                    resolve({
                        status: "err",
                        message: "The user is not authe,tication",
                    });
                }
            });
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.refreshTokenService = refreshTokenService;

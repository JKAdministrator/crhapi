"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const postLogin_1 = __importDefault(require("./auth/postLogin"));
const postLogout_1 = __importDefault(require("./auth/postLogout"));
exports.authController = {
    postLogin: postLogin_1.default,
    postLogout: postLogout_1.default
};

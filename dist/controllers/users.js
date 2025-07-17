"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const getUsers_1 = __importDefault(require("./users/getUsers"));
exports.usersController = {
    getUsers: getUsers_1.default
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testController = void 0;
const getTest_1 = __importDefault(require("./test/getTest"));
//import patchUser    from "./users/patchUser";
//import putUser      from "./users/putUser";
//import deleteUser   from "./users/deleteUser";
exports.testController = {
    getTest: getTest_1.default,
    //patchUser,
    //putUser,
    //deleteUser
};

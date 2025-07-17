"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersDB_1 = __importDefault(require("../auth/usersDB"));
const getUsers = async (req, res, next) => {
    const r = {};
    ``;
    // obtenemos el id de query params del request
    const userId = req.query.id;
    // si hay un id obtengo solo ese usuario, si no se pasa un id obtengo todos los usuarios
    if (userId) {
        const user = usersDB_1.default.find(u => String(u.id) === userId);
        if (!user) {
            r.rows = [];
        }
        else {
            r.rows = [user];
        }
        res.status(200).send(r);
        return;
    }
    // Devolver información del usuario logueado
    r.rows = usersDB_1.default;
    res.status(200).send(r);
    return;
};
exports.default = getUsers;

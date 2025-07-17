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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const problemDocument_1 = __importStar(require("../../utils/problemDocument"));
const usersDB_1 = __importDefault(require("./usersDB")); // Suponiendo que tienes un archivo de configuración con los usuarios
const postLogin = async (req, res, next) => {
    const { username, password } = req.body;
    // Validar que se envíen username y password
    if (!username || !password) {
        const errorDocument = (0, problemDocument_1.default)(problemDocument_1.ERROR_DOCUMENT.BAD_REQUEST, {}, null, 'Username y password son requeridos');
        res.status(errorDocument.status).send(errorDocument);
        return;
    }
    // Buscar el usuario
    const user = usersDB_1.default.find(u => u.username === username && u.password === password);
    if (!user) {
        const errorDocument = (0, problemDocument_1.default)(problemDocument_1.ERROR_DOCUMENT.NOT_AUTHORIZED, {}, null, 'Username y password son requeridos');
        res.status(errorDocument.status).send(errorDocument);
        return;
    }
    // Crear sesión
    req.session.userId = user.id;
    req.session.username = user.username;
    // Compatibilidad con el sistema existente
    req.session.authUserId = user.id;
    req.session.name = user.username;
    req.session.email = `${user.username}@example.com`; // Email ficticio
    const r = {};
    r.rows = [user.id, user.username];
    res.status(200).send(r);
    return;
};
exports.default = postLogin;

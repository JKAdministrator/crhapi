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
Object.defineProperty(exports, "__esModule", { value: true });
const problemDocument_1 = __importStar(require("../../utils/problemDocument"));
const postLogout = async (req, res, next) => {
    if (!req.session.userId) {
        const errorDocument = (0, problemDocument_1.default)(problemDocument_1.ERROR_DOCUMENT.BAD_REQUEST, {}, null, 'No hay sesión activa.');
        res.status(errorDocument.status).send(errorDocument);
        return;
    }
    // Destruir la sesión
    req.session.destroy((err) => {
        if (err) {
            const errorDocument = (0, problemDocument_1.default)(problemDocument_1.ERROR_DOCUMENT.INTERNAL_SERVER_ERROR, {}, null, 'Error al cerrar sesión.');
            res.status(errorDocument.status).send(errorDocument);
            return;
        }
        res.clearCookie('connect.sid'); // Limpiar cookie de sesión
        const r = {};
        r.rows = [];
        res.status(200).send(r);
        return;
    });
};
exports.default = postLogout;

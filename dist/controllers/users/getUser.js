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
const db_1 = __importDefault(require("../../config/db"));
const mssql_1 = __importDefault(require("mssql"));
const problemDocument_1 = __importStar(require("../../utils/problemDocument"));
const getUser = async (req, res, next) => {
    const r = {};
    const userId = req.params.id;
    if (!userId) {
        const errorDocument = (0, problemDocument_1.default)(problemDocument_1.ERROR_DOCUMENT.BAD_REQUEST, { userId }, null, 'User ID is required');
        res.status(errorDocument.status).send(errorDocument);
        return;
    }
    const { authUserId: userIdAuth, name: authUsername, email: authEmail } = req.session;
    const dbPool = db_1.default.connectionPool;
    try {
        const userExists = await dbPool.request()
            .input('input_parameter', mssql_1.default.Int, userId)
            .query('select 1 from users where id = @input_parameter');
        // si no econtramosregistro de usuario, lo creamos
        if (userExists.recordset.length === 0) {
            const errorDocument = (0, problemDocument_1.default)(problemDocument_1.ERROR_DOCUMENT.BAD_REQUEST, { email: authEmail || '' }, null, 'No se encontro al usuario');
            res.status(errorDocument.status).send(errorDocument);
            return;
        }
        ;
        const userData = await dbPool.request()
            .input('input_parameter', mssql_1.default.Int, userId)
            .query('select name, lastname, email from users where id = @input_parameter');
        r.rows = userData.recordset;
    }
    catch (error) {
        throw error;
    }
    finally {
        dbPool.close();
    }
    res.status(200).send(r);
    return;
};
exports.default = getUser;

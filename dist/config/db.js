"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Database {
    constructor() {
        /*
        private _connectionPool: Pool = new Pool({
            user: process.env.PG_USER,
            host: process.env.PG_HOST,
            database: process.env.PG_DATABASE,
            password: process.env.PG_PASSWORD,
            port: parseInt(process.env.PG_PORT || '5432', 10),
        });
    */
        this._sqlConfig = {
            user: process.env.DB_CORHOMA_USER ?? '',
            password: process.env.DB_CORHOMA_PASSWORD ?? '',
            database: process.env.DB_CORHOMA_NAME ?? '',
            server: process.env.DB_CORHOMA_HOST ?? '',
            port: parseInt(process.env.DB_CORHOMA_PORT || '1433', 10),
            pool: {
                max: 10,
                min: 1,
                idleTimeoutMillis: 30000
            },
            options: {
                encrypt: true, // for azure
                trustServerCertificate: false // change to true for local dev / self-signed certs
            }
        };
        this._connectionPool = null;
    }
    async connect() {
        this._connectionPool = await new mssql_1.default.ConnectionPool(this._sqlConfig).connect();
    }
    get connectionPool() {
        return this._connectionPool;
    }
}
const db = new Database();
exports.default = db;

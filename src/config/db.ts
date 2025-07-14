import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();



export interface DatabaseConnection {
    connect(): Promise<void>;
    get connectionPool(): sql.ConnectionPool;
    //connectionPool: Pool | null;
}

class Database implements DatabaseConnection {
    /*
    private _connectionPool: Pool = new Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: parseInt(process.env.PG_PORT || '5432', 10),
    });
*/

    private _sqlConfig = {
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
    }

    private _connectionPool: sql.ConnectionPool | null = null;

    constructor() {
        
    }

    async connect() {
        this._connectionPool = await new sql.ConnectionPool(this._sqlConfig).connect();
    }

    get connectionPool() {
        return this._connectionPool as sql.ConnectionPool;
    }
}

const db = new Database();
export default db;
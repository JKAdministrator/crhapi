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
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        server: 'localhost',
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
        this._connectionPool = await sql.connect(this._sqlConfig);
    }

    get connectionPool() {
        return this._connectionPool as sql.ConnectionPool;
    }
}

const db = new Database();
export default db;
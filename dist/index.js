"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const rateLimiterConfig_1 = __importDefault(require("./config/rateLimiterConfig"));
const verifySession_1 = require("./middlewares/verifySession");
const cors_1 = __importDefault(require("cors"));
//import { auth } from "./auth";
//import { toNodeHandler } from "better-auth/node";
const users_1 = __importDefault(require("./routes/users"));
const test_1 = __importDefault(require("./routes/test"));
const auth_1 = __importDefault(require("./routes/auth"));
const errorHandler_1 = require("./middlewares/errorHandler");
const PORT = process.env.PORT ?? 3000;
const APP = (0, express_1.default)();
const isProduction = process.env.NODE_ENV === "production";
//APP.use();
/*
APP.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    console.log("Response headers:", res.getHeaders());
    return originalSend.call(this, body);
  };
  next();
});
*/
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigin = process.env.WEBCLIENT_CORS_ORIGIN;
        if (!origin || origin === allowedOrigin) {
            callback(null, true);
        }
        else {
            console.error(`CORS blocked request from origin: ${origin}`);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
};
if (isProduction) {
    APP.set('trust proxy', 2); // Trust the first two proxies (for Cliudflare y Nginx)
    APP.use(rateLimiterConfig_1.default);
    APP.use((0, helmet_1.default)());
}
APP.use((0, cors_1.default)(corsOptions));
// Configuración de express-session
APP.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Cambiar a true en producción con HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));
//APP.all("/api/auth/*"                 ,toNodeHandler(auth));
//APP.use("/api/v1/test"                ,express.json(), testRouter);
APP.use("/api/v1/users", express_1.default.json(), verifySession_1.verifySession, users_1.default);
APP.use("/api/v1/test", express_1.default.json(), test_1.default);
APP.use("/api/v1/users", express_1.default.json(), verifySession_1.verifySession, users_1.default);
APP.use("/api/v1/auth", express_1.default.json(), auth_1.default);
APP.use(errorHandler_1.errorHandler);
APP.listen(PORT, (err) => {
    if (err) {
        console.log(`Server not running: ${err}`);
        process.exit(1);
    }
    try {
        //(db as DB).connect();
        //console.log(`Server up: http://localhost:${PORT} with env ${process.env.NODE_ENV}`);
        //console.log(`CORS origin ${process.env.WEBCLIENT_CORS_ORIGIN}`);
        //console.log(`Database connected: ${process.env.PG_HOST} with user ${process.env.PG_USER}`);
        //console.log(`Database name: ${process.env.PG_DATABASE}`);
        //console.log(`Database port: ${process.env.PG_PORT}`);
        //console.log("CORS origin en runtime:", process.env.WEBCLIENT_CORS_ORIGIN);
    }
    catch (e) {
        console.error('Error connecting to database', e);
        process.exit(1);
    }
});

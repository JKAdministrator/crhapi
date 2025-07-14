import express from "express";
import helmet from 'helmet';
import db from './config/db';
import rateLimiterConfig from './config/rateLimiterConfig';
import { verifySession } from "./middlewares/verifySession";
import cors from 'cors';
//import { auth } from "./auth";
//import { toNodeHandler } from "better-auth/node";
import { default as usersRouter } from './routes/users';
import { default as testRouter } from './routes/test';
import { errorHandler } from "./middlewares/errorHandler";


const PORT = process.env.PORT ?? 3000;
const APP = express();
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
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigin = process.env.WEBCLIENT_CORS_ORIGIN;
    
    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      console.error(`CORS blocked request from origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
};


if (isProduction) {
  APP.set('trust proxy', 2); // Trust the first two proxies (for Cliudflare y Nginx)
  APP.use(rateLimiterConfig);
  APP.use(helmet());
}


APP.use(cors(corsOptions));
//APP.all("/api/auth/*"                 ,toNodeHandler(auth));
//APP.use("/api/v1/test"                ,express.json(), testRouter);
APP.use("/api/v1/users"               ,express.json(), verifySession as unknown as express.RequestHandler, usersRouter);
APP.use("/api/v1/test", express.json(), testRouter);
APP.use(errorHandler);



//APP.use("/api/v1/auth",express.json(), authRouter);

interface ListenCallback {
  (err?: Error): void;
}

interface DB {
  connect: () => void;
}

APP.listen(PORT, (err?: Error) => {
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
  } catch (e: unknown) {
    console.error('Error connecting to database', e);
    process.exit(1);
  }
});

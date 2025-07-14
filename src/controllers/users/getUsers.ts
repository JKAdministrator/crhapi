import { Request, Response, NextFunction } from "express";
import db from "../../config/db"; 
import { ExtendedRequest } from "../../middlewares/verifySession";
import ResponseData from "../types";
import mssql from "mssql";
import createErrorDocument, { ERROR_DOCUMENT } from "../../utils/problemDocument";

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const r: ResponseData                                           = {};

    const {authUserId:userId, name:authUsername, email:authEmail}   = (req as ExtendedRequest).session
    const dbPool                                                    = db.connectionPool;

    try {

        const userData = await dbPool.request()
            .query('select name, lastname, email from users');

        r.rows = userData.recordset;
    } catch (error) {
        throw error;
    } finally {
        dbPool.close();
    }

    res.status(200).send(r);
    return;
};

export default getUsers;
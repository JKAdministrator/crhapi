import { Request, Response, NextFunction } from "express";
import db from "../../config/db"; 
import { ExtendedRequest } from "../../middlewares/verifySession";
import ResponseData from "../types";
import mssql from "mssql";
import createErrorDocument, { ERROR_DOCUMENT } from "../../utils/problemDocument";

const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const r: ResponseData                                           = {};

    const {authUserId:userId, name:authUsername, email:authEmail}   = (req as ExtendedRequest).session
    const dbPool                                                    = db.connectionPool;

    try {
        const userExists = await dbPool.request()
            .input('input_parameter', mssql.Int, userId)
            .query('select 1 from users where id = @input_parameter')

        // si no econtramosregistro de usuario, lo creamos
        if (userExists.recordset.length === 0) {
            const errorDocument = createErrorDocument(ERROR_DOCUMENT.BAD_REQUEST , { email: authEmail },null, 'No se encontro al usuario',);
            res.status(errorDocument.status).send(errorDocument);
            return;
        };
    
        const userData = await dbPool.request()
            .input('input_parameter', mssql.Int, userId)
            .query('select name, lastname, email from users where id = @input_parameter');

        r.rows = userData.recordset;
    } catch (error) {
        throw error;
    } finally {
        dbPool.close();
    }

    res.status(200).send(r);
    return;
};

export default getUser;
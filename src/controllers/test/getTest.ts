import { Request, Response, NextFunction } from "express";
import ResponseData from "../types";

const getTest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const r: ResponseData                                           = {};
    r.rows = ["Hola mundo"];
    /*
    if (1 === 1) {
        const errorDocument = createErrorDocument(ERROR_DOCUMENT.BAD_REQUEST, { userId:"sarasa" }, null, 'User ID is required');
        res.status(errorDocument.status).send(errorDocument);
        return;
    }
    */
   

    res.status(200).send(r);
    return;
};

export default getTest;
import { Request, Response, NextFunction } from "express";
import ResponseData from "../types";
import usersDB from "../auth/usersDB";

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const r: ResponseData                                           = {};
``
        // obtenemos el id de query params del request
    const userId = req.query.id as string;
    
    // si hay un id obtengo solo ese usuario, si no se pasa un id obtengo todos los usuarios
    if (userId) {
        const user = usersDB.find(u => String(u.id) === userId);
        if (!user) {
            r.rows = [];
        } else {
            r.rows = [user];
        }
        res.status(200).send(r);
        return;
    }

  // Devolver información del usuario logueado
    r.rows = usersDB;
    res.status(200).send(r);
    return;

};

export default getUsers;
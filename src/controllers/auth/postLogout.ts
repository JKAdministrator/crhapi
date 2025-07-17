import { Request, Response, NextFunction } from "express";
import createErrorDocument, { ERROR_DOCUMENT } from "../../utils/problemDocument";
import ResponseData from "../types";

const postLogout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.session.userId) {
    const errorDocument = createErrorDocument(ERROR_DOCUMENT.BAD_REQUEST, {  }, null, 'No hay sesión activa.');
    res.status(errorDocument.status).send(errorDocument);
    return;
  }

  // Destruir la sesión
  req.session.destroy((err) => {
    if (err) {
        const errorDocument = createErrorDocument(ERROR_DOCUMENT.INTERNAL_SERVER_ERROR, {  }, null, 'Error al cerrar sesión.');
        res.status(errorDocument.status).send(errorDocument);
        return;
    }

    res.clearCookie('connect.sid'); // Limpiar cookie de sesión
    
    
    const r: ResponseData                                           = {};
    r.rows = [];
    res.status(200).send(r);
    return;
  });
};

export default postLogout;
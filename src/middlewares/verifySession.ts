import { Request, Response, NextFunction } from "express";
import { Session } from 'express-session';
import createErrorDocument, { ERROR_DOCUMENT } from "../utils/problemDocument";

export const verifySession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  if (!req.session.authUserId) {
    const errorDocument = createErrorDocument(ERROR_DOCUMENT.NOT_AUTHORIZED);
    res.status(errorDocument.status).send(errorDocument);
    return;
  }

  if (!req.session.userId || !req.session.username) {
    const errorDocument = createErrorDocument(ERROR_DOCUMENT.BAD_REQUEST, {  }, null, 'No hay sesión activa. Debe hacer login primero.');
    res.status(errorDocument.status).send(errorDocument);
    return;
  }

  next();
};
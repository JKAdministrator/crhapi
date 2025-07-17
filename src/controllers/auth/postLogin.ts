import { Request, Response, NextFunction } from "express";
import createErrorDocument, { ERROR_DOCUMENT } from "../../utils/problemDocument";
import ResponseData from "../types";
import usersDB from "./usersDB"; // Suponiendo que tienes un archivo de configuración con los usuarios


const postLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password } = req.body;

  // Validar que se envíen username y password
  if (!username || !password) {
    const errorDocument = createErrorDocument(ERROR_DOCUMENT.BAD_REQUEST, {  }, null, 'Username y password son requeridos');
    res.status(errorDocument.status).send(errorDocument);
    return;

  }

  // Buscar el usuario
  const user = usersDB.find(u => u.username === username && u.password === password);

  if (!user) {
    const errorDocument = createErrorDocument(ERROR_DOCUMENT.NOT_AUTHORIZED, {  }, null, 'Username y password son requeridos');
    res.status(errorDocument.status).send(errorDocument);
    return;
  }

  // Crear sesión
  req.session.userId = user.id;
  req.session.username = user.username;
  
  // Compatibilidad con el sistema existente
  req.session.authUserId = user.id;
  req.session.name = user.username;
  req.session.email = `${user.username}@example.com`; // Email ficticio

    const r: ResponseData                                           = {};
    r.rows = [user.id, user.username];
    res.status(200).send(r);
    return;
};
export default postLogin;
import { Request, Response, NextFunction } from "express";
//import { fromNodeHeaders } from "better-auth/node";
//import { auth } from "../auth"; // Tu instancia de better auth
//import { Middleware } from "better-auth";
import createErrorDocument, { ERROR_DOCUMENT } from "../utils/problemDocument";

export interface ExtendedRequest extends Request {
  session: {
    authUserId: string;
    name:string, 
    email:string
  }
}

export const verifySession = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<void> => {
  console.log("middleware verifySession middleware called");
  try {
    const session = true;
  /*  const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    console.log("middleware verifySession middleware called, session:",session);
    */
    if (!session) {
      console.log("middleware verifySession middleware called, NO SESSION");
        
        const errorDocument = createErrorDocument(ERROR_DOCUMENT.NOT_AUTHORIZED);
        res.status(errorDocument.status).send(errorDocument);
        return;
    }
    req.session = {
      authUserId: '1',
      name:       'julio',
      email:      'julio.kania@gmail.com'
    };
    next();
  } catch (error) {
    console.log("middleware verifySession middleware called, ERROR:",error);
    const errorDocument = createErrorDocument(ERROR_DOCUMENT.NOT_AUTHORIZED,{error:error as any});
    res.status(errorDocument.status).send(errorDocument);
    return;
  }
};
import { Request, Response, NextFunction } from 'express';
import { ProblemDocument } from 'http-problem-details';
import createErrorDocument, {ERROR_DOCUMENT} from '../utils/problemDocument';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log("middleware error called");

  console.error({err}); // Log the error stack trace for debugging
  const mensaje = err.error ? err.error : err.message;
  const problem = createErrorDocument(ERROR_DOCUMENT.INTERNAL_SERVER_ERROR,{error: mensaje},null, 'Internal Server Error',);

  res.status(problem.status).json(problem);

}
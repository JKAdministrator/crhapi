import { Request, Response, NextFunction } from "express";

// Crear un middleware noop para Node.js más antiguos
const noopRateLimit = (req: Request, res: Response, next: NextFunction) => next();

// Intentar crear el rate limiter, si falla usar noop
let rateLimiterConfig: any;

try {
  // Import dinámico para evitar errores de compatibilidad
  const rateLimit = require("express-rate-limit");
  rateLimiterConfig = rateLimit({
    windowMs: 1000 * 60 * 7,
    max: 500,
  });
} catch (error) {
  console.warn('Rate limiter disabled due to compatibility issues:', error);
  rateLimiterConfig = noopRateLimit;
}

export default rateLimiterConfig;
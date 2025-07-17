"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Crear un middleware noop para Node.js más antiguos
const noopRateLimit = (req, res, next) => next();
// Intentar crear el rate limiter, si falla usar noop
let rateLimiterConfig;
try {
    // Import dinámico para evitar errores de compatibilidad
    const rateLimit = require("express-rate-limit");
    rateLimiterConfig = rateLimit({
        windowMs: 1000 * 60 * 7,
        max: 500,
    });
}
catch (error) {
    console.warn('Rate limiter disabled due to compatibility issues:', error);
    rateLimiterConfig = noopRateLimit;
}
exports.default = rateLimiterConfig;

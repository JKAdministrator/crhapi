import rateLimit from "express-rate-limit";
const rateLimiterConfig = rateLimit({
  windowMs: 1000 * 60 * 7,
  max: 500,
});

export default rateLimiterConfig;
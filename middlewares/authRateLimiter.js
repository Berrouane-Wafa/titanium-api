const rateLimit = require('express-rate-limit')

const authLimiter = rateLimit({
    windowMs:  60 * 1000, // 1 minutes
    limit: 3, // Limit each IP to 5 requests per `window` (here, per 1 minutes).
    message: 'Too many login attempts. !',
    statusCode: 429
})
module.exports= authLimiter;
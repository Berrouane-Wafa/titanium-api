const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs:  60 * 1000, // 1 minutes
	limit: 5, // Limit each IP to 5 requests per `window` (here, per 1 minutes).
    message: 'Too many request !',
    statusCode: 429
})
module.exports= limiter;
const redisRateLimit = require("../config/dbupstach");

const redisRateLimiter = async (req,res,next) => {
   try {
    const {success} = await redisRateLimit.limit("My limit key")
    if (!success) {
        res.status(429).json({
            message : "Too many requests, please try again later"
        })
    }
    next()
   } catch (error) {
    console.error(error);
    next(error);
    
   }
}
module.exports=redisRateLimiter;
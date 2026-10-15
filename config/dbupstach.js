
const { Redis } = require("@upstash/redis");
const { Ratelimit } = require("@upstash/ratelimit");

const redis = Redis.fromEnv();

const redisRateLimt = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "900 s"),
    prefix: "login-limit"
});

module.exports = redisRateLimt;
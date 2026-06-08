import ratelimit from "../config/upstash.js";
const rateLimiter = async (req, res, next) => {
  console.log("Rate limiter hit:", req.ip);

  try {
    const result = await ratelimit.limit(req.ip);

    console.log(result);

    const { success } = result;

    if (!success) {
      return res.status(429).json({
        message: "Too many requests",
      });
    }

    next();
  } catch (error) {
    console.error(error);
  }
};


    export default rateLimiter;
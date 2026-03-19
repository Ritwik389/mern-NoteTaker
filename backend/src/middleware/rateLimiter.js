import ratelimit from "../config/upstash.js"

const rateLimiter = async(req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key"); //we usually put a user's id here as we want to calculate the rate limit for every user
        if(!success){
            return res.status(429).json({message: "Too many requests, please try again later"});
        }
        next();
    } catch (error) {
        console.log("Error in ratelimiting", error);
        next(error);
    }

}

export default rateLimiter
const jwt = require("jsonwebtoken");
const {User} = require("../models/user");
const {createError} = require("../helpers");

const {JWT_SECRET} = process.env;


const authenticate = async (req, res, next) => {
    try {
        const {authorization = ""} = req.headers;
        const [bearer, token] = authorization.split(" ");
        if(bearer !== "Bearer") {
            throw createError(401);
        }
        console.log(token)
        try {
            const {id} = jwt.verify(token, JWT_SECRET);
            console.log(id)
            const user = await User.findById(id);
            if(user.token !== token){
                throw createError(401);
            }
            req.user = user;
            next()
        } catch (error) {
            error.status = 401;
            throw error;
        }
    } catch (error) {
        next(error);
    }
}


module.exports = authenticate;
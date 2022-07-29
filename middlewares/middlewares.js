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
        try {
            const {id} = jwt.verify(token, JWT_SECRET);
            const user = await User.findById(id);
            if(!user || !user.token){
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


const validation = (schema) => {
    const func = (req, res, next)=> {
        const { error } = schema.validate(req.body);
        if (error) {
            error.status = 400;
            return next(error);
        }
        next();
    }

    return func;
}

module.exports = {
    authenticate,
    validation
};
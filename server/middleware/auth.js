const {User} = require('../models/user_model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.checkToken = async (req, res, next) => {
    try {
        if (req.headers["x-access-token"]) {
            const accessToken = req.headers["x-access-token"]
            const {_id, email, exp} = jwt.verify(accessToken, process.env.DB_SECRET)
            //locals are using for safe transmission info when we using middleware
            res.locals.userData = await User.findById(_id)
            next()
        } else {
            next()
        }

    } catch (error) {
        return res.status(401).json({error: 'Bad token', errors: error})
    }
}

// Here we checking is user exist in database, maybe we erase him from there. Using res.locals that we get with response. We use this method in user/profile
exports.checkUserExist =  (req, res, next) => {
    const user = res.locals.userData
    if(!user) return  res.status(401).json({error: 'User not exist'})
    req.user = user
    next()
}

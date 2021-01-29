const express = require('express')
let router = express.Router()
require('dotenv').config()

const {User} = require('../../models/user_model')

router.route('/register').post(async (req, res) => {
        try {

            if(await User.emailTaken(req.body.email)) {
                return res.status(400).json({message: 'email taken, choose the other one'})
            }
            const user = new User({
                email: req.body.email,
                password: req.body.password
            })
            const token = user.generateToken()
            const doc = await user.save()

            res.cookie('x-access-token', token).status(200).send(getUserProps(doc))


        } catch (error) {
            res.status(400).json({message: 'Error', error: error})
        }
    }
)

const getUserProps = (userProps) => {
    return {
        _id: userProps._id,
        email: userProps.email,
        firstName: userProps.firstName,
        lastName: userProps.lastName,
        age: userProps.age,
        role: userProps.role
    }
}

module.exports = router

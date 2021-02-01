const express = require('express')
let router = express.Router()
require('dotenv').config()

const {User} = require('../../models/user_model')

router.route('/register').post(async (req, res) => {
        try {
            if (await User.emailTaken(req.body.email)) {
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

router.route('/signin').post(async (req, res) => {
        try {
            // find user
            let user = await User.findOne({email: req.body.email})
            if (!user) return res.status(400).json({message: "Email is not found"})

            // compare password
            const compare = await user.comparePassword(req.body.password)
            if (!compare) return res.status(400).json({message: "Wrong password"})

            // generate token
            const token = user.generateToken()

            // send response
            res.cookie('x-access-token', token).status(200).json({message: 'cool bruh'})


        } catch (error) {
            res.status(400).json({message: 'Error', error: error})
        }
    }
)

router.route('/profile').get(async (req, res) => {
        try {



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

const express = require('express')
const {grantAccess} = require("../../middleware/roles");
const {checkUserExist} = require("../../middleware/auth");
let router = express.Router()
require('dotenv').config()

//model
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

router.route('/profile').get(checkUserExist, grantAccess('readOwn', 'profile'), async (req, res) => {
        try {
            const permission = res.locals.permission
            const user = await User.findById(req.user._id)
            if (!user) return res.status(400).json({message: "Profile is not found"})

            res.status(200).json(permission.filter(user._doc))

        } catch (error) {
            res.status(400).send(error)
        }
    }
).patch(checkUserExist, grantAccess('updateOwn', 'profile'), async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.user._id},
            {
                '$set': {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    age: req.body.age,
                }
            },
            {new: true}
        )
        if (!user) return res.status(400).json({message: 'user not found'})

        res.status(200).json(getUserProps(user))
    } catch (err) {
        res.status(400).json({message: "Can't update this, sorry", error: err})
    }
})


router.route('/isauth').get(checkUserExist, async (req, res) => {
        res.status(200).send(req.user)
    }
)

router.route('/update_email')
    .patch(checkUserExist, grantAccess('updateOwn', 'profile'), async (req, res) => {
        try {
            if (await User.emailTaken(req.body.newEmail)) {
                return res.status(400).json({message: 'Sorry email is taken, try another one'})
            }
            const user = await User.findOneAndUpdate(
                {_id: req.user._id, email: req.body.email},
                {
                    '$set': {
                        email: req.body.newEmail,
                    }
                },
                {new: true}
            )
            if (!user) return res.status(400).json({message: 'user not found'})

            const token = user.generateToken()
            res.cookie('x-access-token', token).status(200).send({email: user.email})
        } catch (err) {
            res.status(400).json({message: "Can't update email, sorry", error: err})
        }
    })

const getUserProps = (userProps) => {
    return {
        _id: userProps._id,
        email: userProps.email,
        firstname: userProps.firstname,
        lastname: userProps.lastname,
        age: userProps.age,
        role: userProps.role
    }
}

module.exports = router

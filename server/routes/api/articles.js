const express = require('express')
let router = express.Router()
require('dotenv').config()
const {grantAccess} = require("../../middleware/roles");
const {checkUserExist} = require("../../middleware/auth");

// model
const {Article} = require('../../models/article_model')

router.route('/admin/add__article')
    .post(checkUserExist, grantAccess('createAny', 'article'), async (req, res) => {
        try {
            const article = new Article({
                ...req.body,
                score: +req.body.score
            })

            const result = await article.save()

            res.status(200).send(result)
        } catch (err) {
            res.status(400).json({message: 'Error adding article', error: err})
        }
    })

router.route('/admin/:id')
    .get(checkUserExist, grantAccess('readAny', 'article'), async (req, res) => {

        try {
            const _id = req.params.id
            const article = await Article.findById(_id)
            if (!article || article.length === 0) return res.status(400).json({message: "Article is not found"})
            res.status(200).json(article)
        } catch (error) {
            res.status(400).json({message: "Something wrong with article", error})
        }
    })
    .patch(checkUserExist, grantAccess('updateAny', 'article'), async (req, res) => {

        try {
            const _id = req.params.id
            const article = await Article.findOneAndUpdate({_id},
                {
                    '$set': req.body
                },
                {new: true}
            )
            if (!article) return res.status(400).json({message: "Article can`t update, cos it not found"})

            res.status(200).json(article)
        } catch (error) {
            res.status(400).json({message: "Something wrong with article updating", error})
        }
    })
    .delete(checkUserExist, grantAccess('deleteAny', 'article'), async (req, res) => {

        try {
            const _id = req.params.id
            const article = await Article.findOneAndRemove({_id})
            if (!article) return res.status(400).json({message: "Article can`t be deleted, cos it not found"})

            res.status(200).json({message: "Article was deleted"})
        } catch (error) {
            res.status(400).json({message: "Error with deleting", error})
        }
    })

router.route('/get_byid/:id')
    .get(async (req, res) => {
        try {
            const _id = req.params.id
            const article = await Article.find({_id,status: 'public'})
            if (!article || article.length === 0) return res.status(400).json({message: "Article not found"})
            res.status(200).json(article)


        } catch (err) {
            res.status(400).json({message: 'Error fetching article', error: err})
        }
    })

router.route('/get_byid/:id')
    .get(async (req, res) => {
        try {
            const _id = req.params.id
            const article = await Article.find({_id,status: 'public'})
            if (!article || article.length === 0) return res.status(400).json({message: "Article not found"})
            res.status(200).json(article)


        } catch (err) {
            res.status(400).json({message: 'Error fetching article', error: err})
        }
    })

module.exports = router

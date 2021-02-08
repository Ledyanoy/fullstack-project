const express = require('express')
const {sortArgsHelper} = require("../../config/helpers");
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

//for all users (not logined)
router.route('/get_byid/:id')
    .get(async (req, res) => {
        try {
            const _id = req.params.id
            const article = await Article.find({_id, status: 'public'})
            if (!article || article.length === 0) return res.status(400).json({message: "Article not found"})
            res.status(200).json(article)


        } catch (err) {
            res.status(400).json({message: 'Error fetching article', error: err})
        }
    })

router.route( '/admin/paginate')
    .post(checkUserExist, grantAccess('readAny', 'articles'), async (req, res) => {
        try {
            // aggQuery needable to aggregatePaginate but it can be empty like Article.aggregate()
            //  const aggQuery = Article.aggregate([{
            //      $match: {title: {$regex: /Zoocity/}, status: 'public'
            //      }
            //  }])
            const aggQuery = Article.aggregate()
            const options = {
                page: req.body.page,
                limit:  req.body.limit || 5,
                sort: {_id: 'desc'}

            }
            const articles = await Article.aggregatePaginate(aggQuery,options)
            res.status(200).json(articles)

        } catch (err) {
            res.status(400).json({message: 'Error', error: err})
        }
    })


router.route('/loadmore')
    .post(async (req, res) => {
        try {

            let sortArgs = sortArgsHelper(req.body)
            const articles = await Article.find({status: 'public'})
                .sort([[sortArgs.sortBy, sortArgs.order]])
                .skip(sortArgs.skip)
                .limit(sortArgs.limit)

            if (!articles || articles.length === 0) return res.status(400).json({message: "Article not found, cos its no more"})
            res.status(200).json(articles)

        } catch (err) {
            res.status(400).json({message: 'Error fetching article', error: err})
        }
    })

module.exports = router

const express = require('express')
const verifyToken = require('../middlewares/auth')

const Like = require('../models/Like')
const router = express.Router()

router.get('/', verifyToken, async (req, res) => {
    try {
        const likes = await Like.find()
        res.status(200).json({success: true, message: 'Loaded like successfuly.', likes})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error.'})
    }
})

router.post('/', verifyToken,async (req, res) => {
    const { postId } = req.body
    if(!postId) return res.status(400).json({success: false, message: "Post not found."})
    try {
        const newLike = new Like({
            post: postId,
            user: req.userId
        })
        await newLike.save()
        return res.status(200).json({success: true, message: "Like created successfully.", like: newLike})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error.'})
    }
})

router.delete('/:id', verifyToken,async (req, res) => {
    const { id } = req.params
    if(!id) return res.status(400).json({success: false, message: "Post not found."})
    try {
        const likeDeleteCondition = {
            post: id,
            user: req.userId
        }
        const deleteLike = await Like.findOneAndDelete(likeDeleteCondition)
        return res.status(200).json({success: true, message: "Like deleted successfully.", like: deleteLike})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error.'})
    }
})

module.exports = router
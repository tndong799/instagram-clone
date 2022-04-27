const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/auth')

const Comment = require('../models/Comment')
const Post = require('../models/Post')


router.get('/', verifyToken, async (req, res) => {
    try {

        const comments = await Comment.find().populate('user', ['username','image','firstname','lastname']).sort({createAt: -1})
        res.status(200).json({success: true, message: 'Loaded like successfuly.', comments})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error.'})
    }
})



router.post('/', verifyToken,async (req, res) => {
    const { post, title } = req.body
    if(!post) return res.status(400).json({success: false, message: "Bài viết không tồn tại."})
    if(!title) return res.status(400).json({success: false, message: "Nội dung bình luận không được để trống."})
    try {
        const newComment = new Comment({
            title: title,
            post: post,
            user: req.userId
        })
        await newComment.save().then( newComment => newComment.populate('user', ['username','image','firstname','lastname']))
        return res.status(200).json({success: true, message: "Bạn đã bình luận thành công.", comment: newComment})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error.'})
    }
})

router.delete('/:id', verifyToken,async (req, res) => {
    const { id } = req.params
    if(!id) return res.status(400).json({success: false, message: "Bình luận không tồn tại"})
    try {
        const comment = await Comment.findById(id).populate('post',['_id', 'user'])
        let commentDeleteCondition = {}
        if(req.userId === comment.post.user || req.userId === comment.user){
            commentDeleteCondition = {
                _id: id
            }
        }
        
        const deleteComment = await Comment.findOneAndDelete(commentDeleteCondition)
        return res.status(200).json({success: true, message: "Đã xóa bình luận.", comment: deleteComment})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error.'})
    }
})


module.exports = router
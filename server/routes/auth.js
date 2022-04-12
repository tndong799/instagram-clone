const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const upload = require('../storage/index')

const User = require('../models/User')
const verifyToken = require('../middlewares/auth')



// @route GET api/auth
// @desc Check user is logged in
// @access Public
router.get('/',verifyToken, async (req, res) => {
    const {name} = req.query
    try {
        if(name){
            const users = await User.find({username: new RegExp(name, 'i')}).select('-password')
            if(!users) return res.status(400).json({success: false, message: 'Username not existed.'})
            return res.status(200).json({success: true, message: 'Username had existed.',users})
        }
        const user = await User.findById(req.userId).select('-password')
        if(!user) return res.status(400).json({success: false, message: 'User not found.'})
        return res.status(200).json({success: true, user})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error.'})
    }
})
// @route GET api/auth
// @desc Login profile user
// @access Privite
router.get('/:username', verifyToken, async (req, res) => {
    const username = req.params.username
    if(!username) return res.status(400).json({success: false, message: 'Params not missing.'})
    try {
        const user = await User.findOne({username: username}).select('-password')
        if(!user) return res.status(400).json({success: false, message: 'Username not existed.'})
        return res.status(200).json({success: true, message: 'Username had existed.',user})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error.'})
    }
})

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req,res) => {
    const { username, password, firstname, lastname } = req.body

    if(!username || !password || !firstname || !lastname) return res.status(400).json({success: false, message: 'Missing fullname, username or password.'})
    try {
        //Check for existing user
        const user = await User.findOne({username})
        if(user) return res.status(400).json({success: false, message: 'Username was existed.'})

        //All good
        const hashedPassword = await argon2.hash(password)

        const newUser = new User({username, password: hashedPassword, firstname, lastname})
        await newUser.save()

        //Return token
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)

        return res.status(200).json({success: true, message: 'User created successfully.', accessToken})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error.'})
    }
})

// @route POST api/auth/login
// @desc Login user
// @access Public

router.post('/login', async (req,res) => {
    const { username, password } = req.body
    if(!username || !password) return res.status(400).json({success: false, message: 'Missing username or password.'})
    try {
        //Check for existing user
        const user = await User.findOne({username})
        if(!user) return res.status(400).json({success: false, message: 'Incorrect username or password.'})


        //Check password
        const passwordValid = await argon2.verify(user.password, password)
        if(!passwordValid) return res.status(400).json({success: false, message: 'Incorrect username or password.'})

        //All good
        //Return token
        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)

        return res.status(200).json({success: true, message: 'User logged in successfully.', accessToken})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error.'})
    }
})

router.put('/:username', verifyToken, upload.single('image'),async (req,res) => {
    const url = req.protocol + '://' + req.get('host')
    const { password, firstname, lastname, action, oldPassword } = req.body

    // if(!password || !firstname || !lastname){
    //     fs.unlinkSync(`./uploads/${req.file.filename}`)
    //     return res.status(400).json({success: false, message: 'Missing password or your name.'})
    // }

    try {
        const userUpdateCondition = {
            _id: req.userId
        }

        const oldUser = await User.findOne(userUpdateCondition);
        //User not authorised to update user
        if(!oldUser) return res.status(401).json({success: false, message: 'User not exist.'})

        //Check password
        if(oldPassword){
            const passwordValid = await argon2.verify(oldUser.password, oldPassword)
            if(!passwordValid) return res.status(400).json({success: false, message: 'Mật khẩu cũ không đúng.'})
        }

        // if(password){
        //     const hashedPassword = await argon2.hash(password)
        // }
        
        let updateUser = {
            password: password ? await argon2.hash(password) : oldUser.password,
            firstname: firstname ? firstname : oldUser.firstname,
            lastname: lastname ? lastname : oldUser.lastname,
            image: req.file ? url + '/uploads/' + req.file.filename : ""
        }
        
        if(!req.file){
            updateUser.image = action ? '' : oldUser.image
        }else{
            const oldImage = oldUser.image.slice(oldUser.image.indexOf('/uploads') + 9)
            oldImage && fs.unlinkSync(`./uploads/${oldImage}`)
        }
        
        updateUser = await User.findOneAndUpdate(userUpdateCondition, updateUser, {new: true})
        
        return res.status(200).json({success: true, message: "Cập nhật tài khoản thành công.", user: updateUser})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error.'})
    }
})

module.exports = router
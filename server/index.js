require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const authRouter = require('./routes/auth') 
const postRouter = require('./routes/post') 
const likeRouter = require('./routes/like') 

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@instagarm.iir2k.mongodb.net/instagram?retryWrites=true&w=majority`)

        console.log('MongoDB connected!')

    }catch(error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json())
app.use('/uploads',express.static('uploads'))

app.use('/api/auth',authRouter)
app.use('/api/posts',postRouter)
app.use('/api/like', likeRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
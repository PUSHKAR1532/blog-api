const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const userRoute = require('./routes/user')
const catRoute = require('./routes/category')
const blogRoute = require('../BLOG API/routes/blog')
const commentRoute = require('../BLOG API/routes/comment')


mongoose.connect('mongodb+srv://Blog:pushkar123@blog.btvfjat.mongodb.net/?retryWrites=true&w=majority&appName=Blog')
.then(res=>{console.log('connected to database')})
.catch(err=>{console.log(err)})

app.use(bodyParser.json())

app.use('/user',userRoute)
app.use('/category',catRoute)
app.use('/blog',blogRoute)
app.use('/comment',commentRoute)

// app.use('*',(req,res)=>{
//     res.status(404).json({
//         msg:'bad request'
//     })
// })

module.exports = app
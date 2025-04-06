const express = require('express')
const router = express.Router()
const Comment = require('../model/Comment')
const mongoose = require('mongoose')
const checkAuth = require('../middleware/checkAuth')
const jwt = require('jsonwebtoken')

//new comments


router .post('/',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'sbs 147')

    const newComment = new Comment({
        _id:new mongoose.Types.ObjectId,
        userId:verify.userId,
        userName:verify.firstName + " " + verify.lastName,
        comment:req.body.comment,
        blogId:req.body.blogId
    })
    newComment.save()
    .then(result=>{
        res.status(200).json({
            newComment:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
            
        })
    })
    
})

//edit comments
router.put('/:id',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'sbs 147')
    console.log(verify)

    Comment.find({_id:req.params.id,userId:verify.userId})
    .then(result=>{
        if(result.length == 0)
        {
            return res.status(400).json({
                  msg:'something went wrong'
            })
        }

        Comment.findOneAndUpdate({_id:req.params.id,userId:verify.userId},{
            $set:{
                userId:verify.userId,
                userName:verify.firstName + " " + verify.lastName,
                comment:req.body.comment,
                blogId:req.body.blogId
            }
        })
        .then(result=>{
            res.status(200).json({
                msg:result
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
         
       })
       .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

//delete comment
router.delete('/:id',(req,res)=>{

    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'sbs 147')
    console.log(verify)

    Comment.deleteOne({_id:req.params.id,userId:verify.userId})
    .then(result=>{
        if(result.deletedCount == 0)
        {
            return res.status(401).json({
                msg:'something is wrong'
            })
        }
        res.status(200).json({
            msg:'deleted success'
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//get comments for any router
router.get('/:blogId',(req,res)=>{
    Comment.find({blogId:req.params.blogId})
    .select("_id userId blogId userName comment")
    .then(result=>{
        res.status(200).json({
            comment:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })

})




module.exports = router
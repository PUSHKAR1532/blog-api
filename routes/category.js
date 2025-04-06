const express = require('express')
const router = express.Router()
const Category = require('../model/Category')
const mongoose = require('mongoose')
const checkAuth = require('../middleware/checkAuth')
const jwt = require('jsonwebtoken')

//add category
router .post('/',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'sbs 147')
    const newCategory = new Category({
        _id:new mongoose.Types.ObjectId,
        userId:verify.userId,
        imageUrl:req.body.imageUrl,
        title:req.body.title
    })
    newCategory.save()
    .then(result=>{
        res.status(200).json({
            newCategory:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
            
        })
    })
    
})

//delete
router.get('/',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'sbs 147')
    Category.find({userId:verify.userId})
    .select("id userId title imageUrl")
    .then(result=>{
        res.status(200).json({
            categoryList:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//delete category
router.delete('/:id',(req,res)=>{

    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'sbs 147')
    console.log(verify)

    Category.deleteOne({_id:req.params.id,userId:verify.userId})
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

//update
router.put('/:id',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'sbs 147')
    console.log(verify)

    Category.find({_id:req.params.id,userId:verify.userId})
    .then(result=>{
        if(result.length == 0)
        {
            return res.status(400).json({
                  msg:'something went wrong'
            })
        }

        Category.findOneAndUpdate({_id:req.params.id,userId:verify.userId},{
            $set:{
                userId:verify.userId,
                title:req.body.title,
                imageUrl:req.body.imageUrl
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



module.exports = router
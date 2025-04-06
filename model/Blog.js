const mongoose = require("mongoose");
const Category = require("./Category");

const blogSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userId:{type:String,require:true},
    title:{type:String,require:true},
    imageUrl:{type:String,require:true},
    categoryTitle:{type:String,require:true},
    categoryId:{type:String,require:true},
    blogDetail:{type:String,require:true},
    userName:{type:String,require:true}

})
module.exports = mongoose.model('Blog',blogSchema);
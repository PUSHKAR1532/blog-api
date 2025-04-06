const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userId:{type:String,require:true},
    title:{type:String,require:true},
    imageUrl:{type:String,require:true}
})
module.exports = mongoose.model('Category',CategorySchema);
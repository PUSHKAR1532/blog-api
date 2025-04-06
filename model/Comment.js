const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userId:{type:String,require:true},
    userName:{type:String,require:true},
    comment:{type:String,require:true},
    blogId:{type:String,require:true}
})
module.exports = mongoose.model('Comment',commentSchema);

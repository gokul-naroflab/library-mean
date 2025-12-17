const mongoose= require("mongoose");
const BookSchema = new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String, required :true},
    genre:{type:String},
    coverImage:{type:String},
    creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
},{timestamps:true});

module.exports = mongoose.model('Book',BookSchema)
const mongoose = require("mongoose");

const entrepreneurSchema = mongoose.Schema({
    entrepreneurname: {type:String, required:true},
    contact: {type:Number, required:true},
    address: {type:String, required:true},
    authid: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
    
    
});
const entrepreneur = mongoose.model("entrepreneur", entrepreneurSchema);

module.exports = {entrepreneur}
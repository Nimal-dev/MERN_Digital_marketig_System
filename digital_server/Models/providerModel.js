const mongoose = require("mongoose");

const providerSchema = mongoose.Schema({
    providername: {type:String, required:true},
    contact: {type:Number, required:true},
    type: {type:String, required:true},
    address: {type:String, required:true},
    authid: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
    
    
});
const provider = mongoose.model("provider", providerSchema);

module.exports = {provider}
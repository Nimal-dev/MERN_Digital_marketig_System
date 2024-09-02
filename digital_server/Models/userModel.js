const mongoose = require("mongoose");

//--------------------User Details Model---------------------------- // 
const userSchema = mongoose.Schema({
  firstname: {type:String, required:true}, 
  lastname: {type:String, required:true},
  contact: {type:Number, required:true},
  authid: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" }, //Collection should be called
});
const user = mongoose.model("user", userSchema);

module.exports = { user };
  
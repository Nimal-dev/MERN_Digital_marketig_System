const mongoose = require("mongoose");

const servicesSchema = mongoose.Schema({
    servicename: {type:String, required:true}
    
});
const services = mongoose.model("services", servicesSchema);

module.exports = {services}
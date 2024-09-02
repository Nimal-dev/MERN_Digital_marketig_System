const mongoose =require('mongoose')


function    connects(){

    mongoose.connect('mongodb://127.0.0.1:27017/Digital_Marketing_Platform')
    .then(()=>console.log('Mongodb connected...'))
    .catch((error)=>{console.log(error)})
}

module.exports = connects
    
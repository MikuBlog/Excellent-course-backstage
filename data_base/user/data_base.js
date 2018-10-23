
var mongoose =require('mongoose')

var Schema = new mongoose.Schema({

    username:String,

    password:String,

    email:String

})

module.exports = mongoose.model('user_lists',Schema)
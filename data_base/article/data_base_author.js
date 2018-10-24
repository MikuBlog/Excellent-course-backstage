
var mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    id:Number,

    name:String,

    show:Boolean

})

module.exports = mongoose.model('author_lists',Schema)
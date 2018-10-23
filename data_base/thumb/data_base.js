
var mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    id:Number,

    name:String,

    description:String,

    upload:String,

    show:Boolean

})

module.exports = mongoose.model('thumb_lists',Schema)
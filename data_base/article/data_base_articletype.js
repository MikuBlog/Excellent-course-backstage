
var mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    id:Number,

    name:String,

    description:String,

    show:Boolean

})

module.exports = mongoose.model('articletype_lists',Schema)
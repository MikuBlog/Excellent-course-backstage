
var mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    id:Number,

    name:String,

    title:String,

    type:String,

    show:Boolean

})

module.exports = mongoose.model('page_lists',Schema)
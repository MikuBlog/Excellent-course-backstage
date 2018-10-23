
var mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    id:Number,

    thumb_id:Number,

    name:String,

    description:String,

    link:String,

    show:Boolean

})

module.exports = mongoose.model('link_lists',Schema)
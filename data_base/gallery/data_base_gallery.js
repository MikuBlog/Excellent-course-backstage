
var mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    id:Number,

    name:String,

    date:Number,

    title:String,

    description:String,

    thumb_id:Number,

    category_id:Number,

    upload:String,

    show:Boolean

})

module.exports = mongoose.model('gallery_lists',Schema)
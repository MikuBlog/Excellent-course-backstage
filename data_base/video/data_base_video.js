
var mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    id:Number,

    name:String,

    title:String,

    description:String,

    upload:String,

    category_id:Number,

    thumb_id:Number,

    show:Boolean

})

module.exports = mongoose.model('video_lists',Schema)
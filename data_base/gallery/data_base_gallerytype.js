
var mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    id:Number,

    name:String,

    description:String,

    thumb_id:Number,

    show:Boolean

})

module.exports = mongoose.model('gallerytype_lists',Schema)
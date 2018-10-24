
var mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    id:Number,

    name:String,

    title:String,

    description:String,

    type:String,

    date:Number,

    category_id:Number,

    thumb_id:Number,

    upload:String,

    show:Boolean

})

module.exports = mongoose.model("fold_lists",Schema)
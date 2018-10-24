
var mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    id:Number,

    name:String,

    post_date:Number,

    post_category:Number,

    post_author:Number,

    post_content:String,

    post_title:String,

    post_summary:String,

    post_status:String,

    show:Boolean

})

module.exports = mongoose.model('article_lists',Schema)


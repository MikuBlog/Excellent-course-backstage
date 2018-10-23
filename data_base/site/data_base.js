
var mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    cover_title:String,

    cover_text:String,

    main_title:String

})

module.exports = mongoose.model('site_msgs',Schema)
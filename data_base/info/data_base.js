var mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    id:Number,

    title:String,

    content:String,

    show:Boolean
    
})

module.exports = mongoose.model('info_lists',Schema)
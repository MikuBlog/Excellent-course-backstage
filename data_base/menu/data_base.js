
var mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    id:String,

    title:String,

    link:String,

    index:Number,

    submenu:Array,

    show:Boolean
    
})

module.exports = mongoose.model('menu_lists',Schema)
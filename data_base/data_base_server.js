var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/ExcellentCourse',{useNewUrlParser:true})

//数据库连接提示信息
mongoose.connection.once('open',function() {
    console.log("连接数据库成功~~~")
})

//数据库关闭提示信息
mongoose.connection.once('close',function() {
    console.log("已断开数据库~~~")
})
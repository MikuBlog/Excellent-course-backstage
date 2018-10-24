
//引入数据库操作对象
var thumb = require('../../data_base/thumb/data_base.js')

/*--------------------------------------处理数据函数--------------------------------------------*/

//处理缩略图修改数据
function handleUpdateThumbMsg(data,req,res) {

    var list = data.split('&')

    var

        id = list[0].split('=')[1],

        name = list[1].split('=')[1],

        description = list[2].split('=')[1]

    if(id == "") {

        res.send({

            status:"error",

            msg:"修改失败,请确保含有id值"

        })

        return

    }

    updateData(id,name,description,req,res)

}

//处理缩略图删除数据
function handleDeleteThumbMsg(data,req,res) {

    var number = data.split("=")[1]

    if(number == undefined || number == "") {

        res.send({

            status:"error",

            msg:"删除失败"

        })

        return

    }

    return number

}

//添加缩略图数据
function insertData(thumbData,req,res) {

    thumb.find({},function(err,data) {

        if(data.length != 0) {

            thumb.find({}).skip(data.length - 1).exec(function(err,data) {

                thumbData["id"] = data[0].id + 1

                thumbData["show"] = true

                thumb.create(thumbData,function(err) {

                    if(err) {

                        res.send({

                            status:"error",
    
                            msg:"添加缩略图失败!"
    
                        })

                    }else {

                        res.send({

                            status:"ok",
    
                            msg:"添加缩略图成功!"
    
                        })

                    }

                })
        
            })

        }else {

            thumbData["id"] = 1

            thumbData["show"] = true

            thumb.create(thumbData,function(err) {

                if(err) {

                    res.send({

                        status:"error",

                        msg:"添加缩略图失败!"

                    })

                }else {

                    res.send({

                        status:"ok",

                        msg:"添加缩略图成功!"

                    })

                }

            })

        }

    })

}

//修改缩略图数据
function updateData(id,name,description,req,res) {

    thumb.updateOne({id:id},{$set:{name:name,description:description}},function(err) {

        if(err) {

            res.send({

                status:"error",

                msg:"修改失败,id值错误!"

            })

        }else {

            res.send({

                status:"ok",

                msg:"修改成功"

            })

        }

    })

}

function deleteData(number,req,res) {

    thumb.updateOne({id:number},{$set:{show:false}},function(err) {

        if(err) {

            res.send({

                status:"error",
                
                msg:"删除失败,请输入正确的id值"

            })

        }else {

            res.send({

                status:"ok",
                
                msg:"删除成功"

            })

        }

    })

}

/*--------------------------------------入口函数--------------------------------------------*/

//添加缩略图
function addThumb(req,res) {

    var obj = {

        name:req.body.name,

        description:req.body.description,

        upload:"/source/images/"+req.file.filename

    }

    insertData(obj,req,res)

}

//修改缩略图信息
function updateThumb(req,res) {

    handleUpdateThumbMsg(req.body,req,res)

}

//删除缩略图
function deleteThumb(req,res) {

    deleteData(handleDeleteThumbMsg(req.body,req,res),req,res)

}


module.exports = {

    addThumb:addThumb,

    updateThumb:updateThumb,

    deleteThumb:deleteThumb

}

//获取公告数据库中的结构
var InfoList = require('../../data_base/info/data_base')

/*--------------------------------------处理数据函数--------------------------------------------*/

//处理插入表单数据
function handleInsertMessage(data,req,res) {

    var list = data.split('&')

    InfoList.find({},function(err,data) {

        if(data.length != 0) {

            InfoList.find({}).skip(data.length - 1).exec(function(err,data) {

                var obj = {}

                obj["id"] = data[0].id + 1
        
                list.forEach(function(value) {

                    var array =  value.split('=')
            
                    var key = array[0]
            
                    var val = array[1]
            
                    obj[key] = val
            
                })

                obj["show"] = true

                insertData(obj,req,res)
        
            })

        }else {

            var obj = {}

            obj["id"] = 1
        
            list.forEach(function(value) {

                var array =  value.split('=')
            
                var key = array[0]
            
                var val = array[1]
            
                obj[key] = val
            
            })

            obj["show"] = true

            insertData(obj,req,res)

        }

    })

}

//处理公告内容的更新
function handleUpdateMessage(data,req,res) {

    var list = data.split('&')

    var title,content,id,attachment

    id = list[0].split('=')[1]

    title = list[1].split('=')[1]

    content = list[2].split('=')[1]

    if(id == "") {

        res.send({

            status:"error",

            msg:"修改失败,请确保含有id值"

        })

        return

    }

    updateData(id,title,content,req,res)

}

//处理删除表单数据
function handleDeleteMessage(data,req,res) {

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

//将数据添加到数据库
function insertData(obj,req,res) {

    if(obj.title == "" || obj.content == "") {

        res.send({status:"error",msg:"表单数据漏写或错误"})

        return

    }

    InfoList.create(obj,function(err) {

        if(err) {

            console.log(err)

        }else {

            res.send({
                
                status:"ok",
                
                msg:"公告添加成功!"
            
            })

        }

    })

}

//更新公告数据
function updateData(id,title,content,req,res) {

    InfoList.updateOne({id:id},{$set:{title:title,content:content}},function(err) {

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

//删除数据(将show改为false)
function deleteData(number,req,res) {

    InfoList.updateOne({id:number},{$set:{show:false}},function(err) {

        if(err) {

            res.send({

                status:"error",
                
                msg:"删除失败"

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

//添加公告
function addInfo(req,res) {

    handleInsertMessage(req.body,req,res)

}

//修改公告
function updateInfo(req,res) {

    console.log(req.body)

    handleUpdateMessage(req.body,req,res)   

}

//删除公告
function deleteInfo(req,res) {

    deleteData(handleDeleteMessage(req.body,req,res),req,res)

}

module.exports = {
    
    addInfo:addInfo,

    updateInfo:updateInfo,

    deleteInfo:deleteInfo

}
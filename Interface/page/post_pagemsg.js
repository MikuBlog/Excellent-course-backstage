
//获取页面数据库操作对象
var page =require('../../data_base/page/data_base.js')

/*--------------------------------------处理数据函数--------------------------------------------*/

//处理添加页面的数据
function handleAddPageMsg(data,req,res) {

    var list = data.split('&')

    page.find({},function(err,data) {

        if(data.length != 0) {

            page.find({}).skip(data.length - 1).exec(function(err,data) {

                var obj = {}

                obj["id"] = data[0].id + 1
        
                list.forEach(function(value) {

                    var array =  value.split('=')
            
                    var key = array[0]
            
                    var val = array[1]
            
                    obj[key] = val
            
                })

                obj["show"] = true

                console.log(obj)

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

//处理修改页面的数据
function handleUpdatePageMsg(data,req,res) {

    var list = data.split('&')

    var

        id = list[0].split('=')[1],

        name = list[1].split('=')[1],

        title = list[2].split('=')[1],

        type = list[3].split('=')[1]

    if(id == "") {

        res.send({

            status:"error",

            msg:"修改失败,请确保含有id值"

        })

        return

    }

    updateData(id,name,title,type,req,res)

}

//处理删除页面的数据
function handleDeletePageMsg(data,req,res) {

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

    if(obj.name == "" || obj.title == "" || obj.type == "") {

        res.send({
            
            status:"error",
            
            msg:"表单数据漏写或错误"
        
        })

        return

    }

    page.create(obj,function(err) {

        if(err) {

            res.send({

                status:"error",
                
                msg:"页面添加失败!"

            })

        }else {

            res.send({
                
                status:"ok",
                
                msg:"页面添加成功!"
            
            })

        }

    })

}

//更新页面数据
function updateData(id,name,title,type,req,res) {

    page.updateOne({id:id},{$set:{name:name,title:title,type:type}},function(err) {

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

//删除页面数据
function deleteData(number,req,res) {

    page.updateOne({id:number},{$set:{show:false}},function(err) {

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


//添加页面
function addPage(req,res) {

    handleAddPageMsg(req.body,req,res)

}

//修改页面
function updatePage(req,res) {

    handleUpdatePageMsg(req.body,req,res)

}

//删除页面
function deletePage(req,res) {

    deleteData(handleDeletePageMsg(req.body,req,res),req,res)

}


module.exports = {

    addPage:addPage,

    updatePage:updatePage,

    deletePage:deletePage

}
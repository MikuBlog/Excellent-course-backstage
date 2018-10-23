
//引入站点配置数据库操作对象
var link =require('../../data_base/link/data_base.js')

/*--------------------------------------数据处理函数--------------------------------------------*/

//处理添加链接数据
function insertData(obj,req,res) {

    if(obj.name == "" || obj.link == "" || obj.thumb_id == "") {

        res.send({
            
            status:"error",
            
            msg:"表单数据漏写或错误"
        
        })

        return

    }

    link.find({},function(err,data) {

        if(data.length != 0) {

            link.find({}).skip(data.length - 1).exec(function(err,data) {

                obj["id"] = data[0].id + 1

                obj["show"] = true

                link.create(obj,function(err) {

                    if(err) {
            
                        res.send({

                            status:"error",
                            
                            msg:"链接添加失败!"

                        })
            
                    }else {
            
                        res.send({
                            
                            status:"ok",
                            
                            msg:"链接添加成功!"
                        
                        })
            
                    }
            
                })
        
            })

        }else {

            obj["id"] = 1

            obj["show"] = true

            link.create(obj,function(err) {

                if(err) {
        
                    res.send({

                        status:"error",
                        
                        msg:"链接添加失败!"

                    })
        
                }else {
        
                    res.send({
                        
                        status:"ok",
                        
                        msg:"链接添加成功!"
                    
                    })
        
                }
        
            })

        }

    })

}

//处理修改链接数据
function updateData(obj,req,res) {

    if(obj.id == "") {

        res.send({

            status:"error",

            msg:"修改失败,请确保含有id值"

        })

        return

    }

    link.updateOne({id:obj.id},{$set:{name:obj.name,description:obj.description,link:obj.link,thumb_id:obj.thumb_id}},function(err) {

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

//处理删除链接数据
function deleteData(obj,req,res) {

    link.updateOne({id:obj.id},{$set:{show:false}},function(err) {

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

//添加链接
function addLink(req,res) {

    insertData(req.body,req,res)

}

//修改链接信息
function updateLink(req,res) {

    updateData(req.body,req,res)
    
}

//删除链接
function deleteLink(req,res) {

    deleteData(req.body,req,res)

}

module.exports = {

    addLink:addLink,

    updateLink:updateLink,

    deleteLink:deleteLink

}
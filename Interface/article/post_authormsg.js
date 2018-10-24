
//引入作者数据库操作对象
var author =require('../../data_base/article/data_base_author.js')

/*--------------------------------------数据处理函数--------------------------------------------*/

//处理添加作者信息
function insertData(obj,req,res) {

    if(obj.name == "") {

        res.send({
            
            status:"error",
            
            msg:"表单数据漏写或错误"
        
        })

        return

    }

    author.find({},function(err,data) {

        if(data.length != 0) {

            author.find({}).skip(data.length - 1).exec(function(err,data) {

                obj["id"] = data[0].id + 1

                obj["show"] = true

                author.create(obj,function(err) {

                    if(err) {
            
                        res.send({

                            status:"error",
                            
                            msg:"作者添加失败!"

                        })
            
                    }else {
            
                        res.send({
                            
                            status:"ok",
                            
                            msg:"作者添加成功!"
                        
                        })
            
                    }
            
                })
        
            })

        }else {

            obj["id"] = 1

            obj["show"] = true

            author.create(obj,function(err) {

                if(err) {
        
                    res.send({

                        status:"error",
                        
                        msg:"作者添加失败!"

                    })
        
                }else {
        
                    res.send({
                        
                        status:"ok",
                        
                        msg:"作者添加成功!"
                    
                    })
        
                }
        
            })

        }

    })

}

//处理作者修改信息
function updateData(obj,req,res) {

    if(obj.id == "") {

        res.send({

            status:"error",

            msg:"修改失败,请确保含有id值"

        })

        return

    }

    author.updateOne({id:obj.id},{$set:{name:obj.name}},function(err) {

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

//处理删除作者信息
function deleteData(obj,req,res) {

    author.updateOne({id:obj.id},{$set:{show:false}},function(err) {

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

//添加作者
function addAuthor(req,res) {

    insertData(req.body,req,res)

}

//修改作者信息
function updateAuthor(req,res) {

    updateData(req.body,req,res)

}

//删除作者
function deleteAuthor(req,res) {

    deleteData(req.body,req,res)

}


module.exports = {

    addAuthor:addAuthor,

    updateAuthor:updateAuthor,

    deleteAuthor:deleteAuthor

}
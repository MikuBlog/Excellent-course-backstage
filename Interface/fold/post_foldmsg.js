
//引入文件数据库操作对象
var fold =require('../../data_base/fold/data_base_fold.js')

//引入文件分类数据库操作对象
var foldtype =require('../../data_base/fold/data_base_foldtype.js')

/*--------------------------------------数据处理函数--------------------------------------------*/

//处理添加文件数据
function insertData(obj,filename,req,res) {

    if(obj.name == "" || obj.category_id == "" || obj.thumb_id == "" || filename == "" || obj.title == "") {

        res.send({
            
            status:"error",
            
            msg:"表单数据漏写或错误"
        
        })

        return

    }

    fold.find({},function(err,data) {

        if(data.length != 0) {

            fold.find({}).skip(data.length - 1).exec(function(err,data) {

                obj["id"] = data[0].id + 1

                obj["upload"] = "/source/files/"+filename

                obj["show"] = true

                fold.create(obj,function(err) {

                    if(err) {
            
                        res.send({

                            status:"error",
                            
                            msg:"文件添加失败!"

                        })
            
                    }else {
            
                        res.send({
                            
                            status:"ok",
                            
                            msg:"文件添加成功!"
                        
                        })
            
                    }
            
                })
        
            })

        }else {

            obj["id"] = 1

            obj["upload"] = "/source/files/"+filename

            obj["show"] = true

            fold.create(obj,function(err) {

                if(err) {
        
                    res.send({

                        status:"error",
                        
                        msg:"文件添加失败!"

                    })
        
                }else {
        
                    res.send({
                        
                        status:"ok",
                        
                        msg:"文件添加成功!"
                    
                    })
        
                }
        
            })

        }

    })

}

//处理添加文件分类数据
function insertTypeData(obj,req,res) {

    console.log(obj)

    if(obj.name == "" || obj.thumb_id == "") {

        res.send({
            
            status:"error",
            
            msg:"表单数据漏写或错误"
        
        })

        return

    }

    foldtype.find({},function(err,data) {

        if(data.length != 0) {

            foldtype.find({}).skip(data.length - 1).exec(function(err,data) {

                obj["id"] = data[0].id + 1

                obj["show"] = true

                foldtype.create(obj,function(err) {

                    if(err) {
            
                        res.send({

                            status:"error",
                            
                            msg:"文件分类添加失败!"

                        })
            
                    }else {
            
                        res.send({
                            
                            status:"ok",
                            
                            msg:"文件分类添加成功!"
                        
                        })
            
                    }
            
                })
        
            })

        }else {

            obj["id"] = 1

            obj["show"] = true

            foldtype.create(obj,function(err) {

                if(err) {
        
                    res.send({

                        status:"error",
                        
                        msg:"文件分类添加失败!"

                    })
        
                }else {
        
                    res.send({
                        
                        status:"ok",
                        
                        msg:"文件分类添加成功!"
                    
                    })
        
                }
        
            })

        }

    })

}

//处理文件修改数据
function updateData(obj,req,res) {

    if(obj.id == "") {

        res.send({

            status:"error",

            msg:"修改失败,请确保含有id值"

        })

        return

    }

    fold.updateOne({id:obj.id},{$set:{name:obj.name,description:obj.description,title:obj.title,category_id:obj.category_id,thumb_id:obj.thumb_id}},function(err) {

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

//处理文件分类修改数据
function updateTypeData(obj,req,res) {

    if(obj.id == "") {

        res.send({

            status:"error",

            msg:"修改失败,请确保含有id值"

        })

        return

    }

    foldtype.updateOne({id:obj.id},{$set:{name:obj.name,description:obj.description,thumb_id:obj.thumb_id}},function(err) {

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

//处理删除文件修改数据
function deleteData(obj,req,res) {

    fold.updateOne({id:obj.id},{$set:{show:false}},function(err) {

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

//处理删除文件分类数据
function deleteTypeData(obj,req,res) {

    foldtype.updateOne({id:obj.id},{$set:{show:false}},function(err) {

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

//添加文件
function addFold(req,res) {

    insertData(req.body,req.file.filename,req,res)

}

//修改文件
function updateFold(req,res) {

    updateData(req.body,req,res)

}

//删除文件
function deleteFold(req,res) {

    deleteData(req.body,req,res)

}

//添加文件分类
function addFoldType(req,res) {

    insertTypeData(req.body,req,res)

}

//修改文件分类
function updateFoldType(req,res) {

    updateTypeData(req.body,req,res)

}

//删除文件分类
function deleteFoldType(req,res) {

    deleteTypeData(req.body,req,res)

}


module.exports = {

    addFold:addFold,

    updateFold:updateFold,

    deleteFold:deleteFold,

    addFoldType:addFoldType,

    updateFoldType:updateFoldType,

    deleteFoldType:deleteFoldType

}
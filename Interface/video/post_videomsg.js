
//引入视频数据库操作对象
var video =require('../../data_base/video/data_base_video.js')

//引入视频分类数据库操作对象
var videotype =require('../../data_base/video/data_base_videotype.js')

/*--------------------------------------数据处理函数--------------------------------------------*/

//处理添加视频数据
function insertData(obj,filename,req,res) {

    if(obj.name == "" || obj.category_id == "" || obj.thumb_id == "" || filename == "" || obj.title == "") {

        res.send({
            
            status:"error",
            
            msg:"表单数据漏写或错误"
        
        })

        return

    }

    video.find({},function(err,data) {

        if(data.length != 0) {

            video.find({}).skip(data.length - 1).exec(function(err,data) {

                obj["id"] = data[0].id + 1

                obj["upload"] = "/source/videos/"+filename

                obj["show"] = true

                video.create(obj,function(err) {

                    if(err) {
            
                        res.send({

                            status:"error",
                            
                            msg:"视频添加失败!"

                        })
            
                    }else {
            
                        res.send({
                            
                            status:"ok",
                            
                            msg:"视频添加成功!"
                        
                        })
            
                    }
            
                })
        
            })

        }else {

            obj["id"] = 1

            obj["upload"] = "source/videos/"+filename

            obj["show"] = true

            video.create(obj,function(err) {

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

//处理添加视频分类数据
function insertTypeData(obj,req,res) {

    if(obj.name == "" || obj.thumb_id == "") {

        res.send({
            
            status:"error",
            
            msg:"表单数据漏写或错误"
        
        })

        return

    }

    videotype.find({},function(err,data) {

        if(data.length != 0) {

            videotype.find({}).skip(data.length - 1).exec(function(err,data) {

                obj["id"] = data[0].id + 1

                obj["show"] = true

                videotype.create(obj,function(err) {

                    if(err) {
            
                        res.send({

                            status:"error",
                            
                            msg:"视频分类添加失败!"

                        })
            
                    }else {
            
                        res.send({
                            
                            status:"ok",
                            
                            msg:"视频分类添加成功!"
                        
                        })
            
                    }
            
                })
        
            })

        }else {

            obj["id"] = 1

            obj["show"] = true

            videotype.create(obj,function(err) {

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

//处理视频修改数据
function updateData(obj,req,res) {

    if(obj.id == "") {

        res.send({

            status:"error",

            msg:"修改失败,请确保含有id值"

        })

        return

    }

    video.updateOne({id:obj.id},{$set:{name:obj.name,description:obj.description,title:obj.title,category_id:obj.category_id,thumb_id:obj.thumb_id}},function(err) {

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

//处理视频分类修改数据
function updateTypeData(obj,req,res) {

    if(obj.id == "") {

        res.send({

            status:"error",

            msg:"修改失败,请确保含有id值"

        })

        return

    }

    videotype.updateOne({id:obj.id},{$set:{name:obj.name,description:obj.description,thumb_id:obj.thumb_id}},function(err) {

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

//处理删除视频修改数据
function deleteData(obj,req,res) {

    video.updateOne({id:obj.id},{$set:{show:false}},function(err) {

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

//处理删除视频分类数据
function deleteTypeData(obj,req,res) {

    videotype.updateOne({id:obj.id},{$set:{show:false}},function(err) {

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

//添加视频
function addVideo(req,res) {

    insertData(req.body,req.file.filename,req,res)

}

//修改视频
function updateVideo(req,res) {

    updateData(req.body,req,res)

}

//删除视频
function deleteVideo(req,res) {

    deleteData(req.body,req,res)

}

//添加视频分类
function addVideoType(req,res) {

    insertTypeData(req.body,req,res)

}

//修改视频分类
function updateVideoType(req,res) {

    updateTypeData(req.body,req,res)

}

//删除视频分类
function deleteVideoType(req,res) {

    deleteTypeData(req.body,req,res)

}


module.exports = {

    addVideo:addVideo,

    updateVideo:updateVideo,

    deleteVideo:deleteVideo,

    addVideoType:addVideoType,

    updateVideoType:updateVideoType,

    deleteVideoType:deleteVideoType

}
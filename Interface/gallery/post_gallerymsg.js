
//引入图片数据库操作对象
var gallery =require('../../data_base/gallery/data_base_gallery.js')

//引入图片分类数据库操作对象
var gallerytype =require('../../data_base/gallery/data_base_gallerytype.js')

/*--------------------------------------数据处理函数--------------------------------------------*/

//处理添加图片数据
function insertData(obj,filename,req,res) {

    if(obj.name == "" || obj.category_id == "" || obj.thumb_id == "" || filename == "" || obj.title == "") {

        res.send({
            
            status:"error",
            
            msg:"表单数据漏写或错误"
        
        })

        return

    }

    gallery.find({},function(err,data) {

        if(data.length != 0) {

            gallery.find({}).skip(data.length - 1).exec(function(err,data) {

                obj["id"] = data[0].id + 1

                obj["upload"] = "/source/images/"+filename

                obj["show"] = true

                gallery.create(obj,function(err) {

                    if(err) {
            
                        res.send({

                            status:"error",
                            
                            msg:"图片添加失败!"

                        })
            
                    }else {
            
                        res.send({
                            
                            status:"ok",
                            
                            msg:"图片添加成功!"
                        
                        })
            
                    }
            
                })
        
            })

        }else {

            obj["id"] = 1

            obj["upload"] = "/source/images/"+filename

            obj["show"] = true

            gallery.create(obj,function(err) {

                if(err) {
        
                    res.send({

                        status:"error",
                        
                        msg:"图片添加失败!"

                    })
        
                }else {
        
                    res.send({
                        
                        status:"ok",
                        
                        msg:"图片添加成功!"
                    
                    })
        
                }
        
            })

        }

    })

}

//处理添加图片分类数据
function insertTypeData(obj,req,res) {

    if(obj.name == "" || obj.thumb_id == "") {

        res.send({
            
            status:"error",
            
            msg:"表单数据漏写或错误"
        
        })

        return

    }

    gallerytype.find({},function(err,data) {

        if(data.length != 0) {

            gallerytype.find({}).skip(data.length - 1).exec(function(err,data) {

                obj["id"] = data[0].id + 1

                obj["show"] = true

                gallerytype.create(obj,function(err) {

                    if(err) {
            
                        res.send({

                            status:"error",
                            
                            msg:"图片分类添加失败!"

                        })
            
                    }else {
            
                        res.send({
                            
                            status:"ok",
                            
                            msg:"图片分类添加成功!"
                        
                        })
            
                    }
            
                })
        
            })

        }else {

            obj["id"] = 1

            obj["show"] = true

            gallerytype.create(obj,function(err) {

                if(err) {
        
                    res.send({

                        status:"error",
                        
                        msg:"图片分类添加失败!"

                    })
        
                }else {
        
                    res.send({
                        
                        status:"ok",
                        
                        msg:"图片分类添加成功!"
                    
                    })
        
                }
        
            })

        }

    })

}

//处理图片修改数据
function updateData(obj,req,res) {

    if(obj.id == "") {

        res.send({

            status:"error",

            msg:"修改失败,请确保含有id值"

        })

        return

    }

    gallery.updateOne({id:obj.id},{$set:{name:obj.name,description:obj.description,title:obj.title,category_id:obj.category_id,thumb_id:obj.thumb_id}},function(err) {

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

//处理图片分类修改数据
function updateTypeData(obj,req,res) {

    if(obj.id == "") {

        res.send({

            status:"error",

            msg:"修改失败,请确保含有id值"

        })

        return

    }

    gallerytype.updateOne({id:obj.id},{$set:{name:obj.name,description:obj.description,thumb_id:obj.thumb_id}},function(err) {

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

//处理删除图片修改数据
function deleteData(obj,req,res) {

    gallery.updateOne({id:obj.id},{$set:{show:false}},function(err) {

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

//处理删除图片分类数据
function deleteTypeData(obj,req,res) {

    gallerytype.updateOne({id:obj.id},{$set:{show:false}},function(err) {

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

//添加图片
function addGallery(req,res) {

    insertData(req.body,req.file.filename,req,res)

}

//修改图片
function updateGallery(req,res) {

    updateData(req.body,req,res)

}

//删除图片
function deleteGallery(req,res) {

    deleteData(req.body,req,res)

}

//添加图片分类
function addGalleryType(req,res) {

    insertTypeData(req.body,req,res)

}

//修改图片分类
function updateGalleryType(req,res) {

    updateTypeData(req.body,req,res)

}

//删除图片分类
function deleteGalleryType(req,res) {

    deleteTypeData(req.body,req,res)

}


module.exports = {

    addGallery:addGallery,

    updateGallery:updateGallery,

    deleteGallery:deleteGallery,

    addGalleryType:addGalleryType,

    updateGalleryType:updateGalleryType,

    deleteGalleryType:deleteGalleryType

}
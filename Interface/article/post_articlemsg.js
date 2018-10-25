
//引入文章数据库操作对象
var article =require('../../data_base/article/data_base_article.js')

//引入文章分类数据库操作对象
var articletype =require('../../data_base/article/data_base_articletype.js')

/*--------------------------------------数据处理函数--------------------------------------------*/

//处理添加文章数据
function insertData(obj,req,res) {

    if(obj.name == "" || obj.post_category == "" || obj.post_author== "" || obj.post_title == "" || obj.post_status == "" ) {

        res.send({
            
            status:"error",
            
            msg:"表单数据漏写或错误"
        
        })

        return

    }

    article.find({},function(err,data) {

        if(data.length != 0) {

            article.find({}).skip(data.length - 1).exec(function(err,data) {

                obj["id"] = data[0].id + 1

                obj["show"] = true

                article.create(obj,function(err) {

                    if(err) {
            
                        res.send({

                            status:"error",
                            
                            msg:"文章文章失败!"

                        })
            
                    }else {
            
                        res.send({
                            
                            status:"ok",
                            
                            msg:"文章添加成功!"
                        
                        })
            
                    }
            
                })
        
            })

        }else {

            obj["id"] = 1

            obj["show"] = true

            article.create(obj,function(err) {

                if(err) {
        
                    res.send({

                        status:"error",
                        
                        msg:"文章添加失败!"

                    })
        
                }else {
        
                    res.send({
                        
                        status:"ok",
                        
                        msg:"文章添加成功!"
                    
                    })
        
                }
        
            })

        }

    })

}

//处理添加文章分类数据
function insertTypeData(obj,req,res) {

    if(obj.name == "" || obj.thumb_id == "") {

        res.send({
            
            status:"error",
            
            msg:"表单数据漏写或错误"
        
        })

        return

    }

    articletype.find({},function(err,data) {

        if(data.length != 0) {

            articletype.find({}).skip(data.length - 1).exec(function(err,data) {

                obj["id"] = data[0].id + 1

                obj["show"] = true

                articletype.create(obj,function(err) {

                    if(err) {
            
                        res.send({

                            status:"error",
                            
                            msg:"文章分类添加失败!"

                        })
            
                    }else {
            
                        res.send({
                            
                            status:"ok",
                            
                            msg:"文章分类添加成功!"
                        
                        })
            
                    }
            
                })
        
            })

        }else {

            obj["id"] = 1

            obj["show"] = true

            articletype.create(obj,function(err) {

                if(err) {
        
                    res.send({

                        status:"error",
                        
                        msg:"文章分类添加失败!"

                    })
        
                }else {
        
                    res.send({
                        
                        status:"ok",
                        
                        msg:"文章分类添加成功!"
                    
                    })
        
                }
        
            })

        }

    })

}

//处理文章修改数据
function updateData(obj,req,res) {

    if(obj.id == "") {

        res.send({

            status:"error",

            msg:"修改失败,请确保含有id值"

        })

        return

    }

    article.updateOne({id:obj.id},{$set:{name:obj.name,post_category:obj.post_category,post_author:obj.post_author,post_summary:obj.post_summary,post_status:obj.post_status,post_title:obj.post_title,post_content:obj.post_content}},function(err) {

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

//处理文章分类修改数据
function updateTypeData(obj,req,res) {

    if(obj.id == "") {

        res.send({

            status:"error",

            msg:"修改失败,请确保含有id值"

        })

        return

    }

    articletype.updateOne({id:obj.id},{$set:{name:obj.name,description:obj.description}},function(err) {

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

//处理删除文章修改数据
function deleteData(obj,req,res) {

    article.updateOne({id:obj.id},{$set:{show:false}},function(err) {

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

//处理删除文章分类数据
function deleteTypeData(obj,req,res) {

    articletype.updateOne({id:obj.id},{$set:{show:false}},function(err) {

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

//添加文章
function addArticle(req,res) {

    insertData(req.body,req,res)

}

//修改文章
function updateArticle(req,res) {

    updateData(req.body,req,res)

}

//删除文章
function deleteArticle(req,res) {

    deleteData(req.body,req,res)

}

//添加文章分类
function addArticleType(req,res) {

    insertTypeData(req.body,req,res)

}

//修改文章分类
function updateArticleType(req,res) {

    updateTypeData(req.body,req,res)

}

//删除文章分类
function deleteArticleType(req,res) {

    deleteTypeData(req.body,req,res)

}


module.exports = {

    addArticle:addArticle,

    updateArticle:updateArticle,

    deleteArticle:deleteArticle,

    addArticleType:addArticleType,

    updateArticleType:updateArticleType,

    deleteArticleType:deleteArticleType

}
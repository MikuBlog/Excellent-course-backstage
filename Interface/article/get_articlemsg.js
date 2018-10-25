
//引入文章数据库操作对象
var article =require('../../data_base/article/data_base_article.js')

//引入文章分类数据库操作对象
var articletype =require('../../data_base/article/data_base_articletype.js')

//引入url,用于分析传入url后的参数
var url = require('url')

/*--------------------------------------入口函数--------------------------------------------*/

//获取文章总页数
function getArticleCount(req,res) {

    article.find({show:true},function(err,data) {

        if(data.length != 0) {

            res.send({

                status:"ok",
    
                msg:"获取文章总页数",
    
                count:Math.ceil(data.length/10)
    
            })

        }else {

            res.send({

                status:"error",

                msg:"没有任何文章信息"

            })

        }

    })

}

//获取文章列表
function getArticleList(req,res) {

    try {

        var pageNumber = parseInt(url.parse(req.url).query.split('=')[1])

    }catch(e) {

        res.send({

            status:"error",

            msg:"请填写正确的url"

        })

        return

    }

    article.find({show:true},{"_id":0,"show":0}).skip((pageNumber-1)*10).limit(10).exec(function(err,data) {

        res.send({

            status:"ok",

            msg:"获取文章列表",

            list:data

        })

    })

}

//获取文章信息
function getArticleMsg(req,res) {

    //获取id值
    try {

        var pageNumber = parseInt(url.parse(req.url).query.split("=")[1])

    }catch(e) {

        res.send({

            status:"error",

            msg:"请填写正确的url"

        })

        return

    }

    article.findOne({id:pageNumber,show:true},{"_id":0,"show":0}).exec(function(err,data) {

        if(data) {

            res.send({

                status:"ok",

                msg:"获取文章详情",

                articlemsg:data

            })

        }else {

            res.send({

                status:"error",

                msg:"没有找到相应文章信息"

            })

        }

    }) 

}

//获取文章分类总页数
function getArticleTypeCount(req,res) {

    articletype.find({show:true},function(err,data) {

        if(data.length != 0) {

            res.send({

                status:"ok",
    
                msg:"获取文章分类总页数",
    
                count:Math.ceil(data.length/10)
    
            })

        }else {

            res.send({

                status:"error",

                msg:"没有任何文章分类信息"

            })

        }

    })

}

//获取文章分类列表
function getArticleTypeList(req,res) {

    try {

        var pageNumber = parseInt(url.parse(req.url).query.split('=')[1])

    }catch(e) {

        res.send({

            status:"error",

            msg:"请填写正确的url"

        })

        return

    }

    articletype.find({show:true},{"_id":0,"show":0}).skip((pageNumber-1)*10).limit(10).exec(function(err,data) {

        res.send({

            status:"ok",

            msg:"获取文章分类列表",

            list:data

        })

    })

}

//获取文章分类信息
function getArticleTypeMsg(req,res) {

    //获取id值
    try {

        var pageNumber = parseInt(url.parse(req.url).query.split("=")[1])

    }catch(e) {

        res.send({

            status:"error",

            msg:"请填写正确的url"

        })

        return

    }

    articletype.findOne({id:pageNumber,show:true},{"_id":0,"show":0}).exec(function(err,data) {

        if(data) {

            res.send({

                status:"ok",

                msg:"获取文章分类详情",

                articletypemsg:data

            })

        }else {

            res.send({

                status:"error",

                msg:"没有找到相应文章分类信息"

            })

        }

    }) 

}


module.exports = {

    getArticleCount:getArticleCount,

    getArticleList:getArticleList,

    getArticleMsg:getArticleMsg,

    getArticleTypeCount:getArticleTypeCount,

    getArticleTypeList:getArticleTypeList,

    getArticleTypeMsg:getArticleTypeMsg

}
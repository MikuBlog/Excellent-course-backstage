
//引入作者数据库操作对象
var author =require('../../data_base/article/data_base_author.js')

//引入url,用于分析传入url后的参数
var url = require('url')

/*--------------------------------------入口函数--------------------------------------------*/

//获取视频总页数
function getAuthorCount(req,res) {

    author.find({show:true},function(err,data) {

        if(data.length != 0) {

            res.send({

                status:"ok",
    
                msg:"获取作者总页数",
    
                count:Math.ceil(data.length/10)
    
            })

        }else {

            res.send({

                status:"error",

                msg:"没有任何作者信息"

            })

        }

    })

}

//获取视频列表
function getAuthorList(req,res) {

    try {

        var pageNumber = parseInt(url.parse(req.url).query.split('=')[1])

    }catch(e) {

        res.send({

            status:"error",

            msg:"请填写正确的url"

        })

        return

    }

    author.find({show:true},{"_id":0,"show":0}).skip((pageNumber-1)*10).limit(10).exec(function(err,data) {

        res.send({

            status:"ok",

            msg:"获取作者列表",

            list:data

        })

    })

}

//获取视频信息
function getAuthorMsg(req,res) {

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

    author.findOne({id:pageNumber,show:true},{"_id":0,"show":0}).exec(function(err,data) {

        if(data) {

            res.send({

                status:"ok",

                msg:"获取作者详情",

                authormsg:data

            })

        }else {

            res.send({

                status:"error",

                msg:"没有找到相应作者信息"

            })

        }

    }) 

}

module.exports = {

    getAuthorCount:getAuthorCount,

    getAuthorList:getAuthorList,

    getAuthorMsg:getAuthorMsg

}
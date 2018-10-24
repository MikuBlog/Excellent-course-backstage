
//获取页面数据库操作对象
var page =require('../../data_base/page/data_base.js')

//引入url,用于分析传入url后的参数
var url = require('url')

/*--------------------------------------入口函数--------------------------------------------*/

//获取页面总页数
function getPageCount(req,res) {

    page.find({show:true},function(err,data) {

        if(data.length != 0) {

            res.send({

                status:"ok",
    
                msg:"获取页面总页数",
    
                count:Math.ceil(data.length/10)
    
            })

        }else {

            res.send({

                status:"error",

                msg:"没有任何页面信息"

            })

        }

    })

}

//获取页面列表
function getPageList(req,res) {

    try {

        var pageNumber = parseInt(url.parse(req.url).query.split('=')[1])

    }catch(e) {

        res.send({

            status:"error",

            msg:"请填写正确的url"

        })

        return

    }

    page.find({show:true},{"_id":0,"show":0}).skip((pageNumber-1)*10).limit(10).exec(function(err,data) {

        res.send({

            status:"ok",

            msg:"获取页面列表",

            list:data

        })

    })

}

//获取页面信息
function getPageDetail(req,res) {

    try {

        var id = parseInt(url.parse(req.url).query.split('=')[1])

    }catch(e) {

        res.send({

            status:"error",

            msg:"请填写正确的url"

        })

        return

    }

    page.findOne({id:id,show:true},{"_id":0,"show":0}).exec(function(err,data) {

        if(data) {

            res.send({

                status:"ok",

                msg:"获取页面信息成功!",

                page:data

            })

        }else {

            res.send({

                status:"error",

                msg:"获取页面失败!"

            })

        }

    })

}

module.exports = {

    getPageCount:getPageCount,

    getPageList:getPageList,

    getPageDetail:getPageDetail

}
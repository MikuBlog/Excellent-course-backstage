
//引入链接数据库操作对象
var link =require('../../data_base/link/data_base.js')

//引入url,用于分析传入url后的参数
var url = require('url')

/*--------------------------------------入口函数--------------------------------------------*/

//获取链接总页数
function getLinkCount(req,res) {

    link.find({show:true},function(err,data) {

        if(data.length != 0) {

            res.send({

                status:"ok",
    
                msg:"获取链接总页数",
    
                count:Math.ceil(data.length/10)
    
            })

        }else {

            res.send({

                status:"error",

                msg:"没有任何链接信息"

            })

        }

    })

}

//获取链接列表
function getLinkList(req,res) {

    try {

        var pageNumber = parseInt(url.parse(req.url).query.split('=')[1])

    }catch(e) {

        res.send({

            status:"error",

            msg:"请填写正确的url"

        })

        return

    }

    link.find({show:true},{"_id":0,"show":0}).skip((pageNumber-1)*10).limit(10).exec(function(err,data) {

        res.send({

            status:"ok",

            msg:"获取链接列表",

            list:data

        })

    })

}

module.exports = {

    getLinkCount:getLinkCount,

    getLinkList:getLinkList

}
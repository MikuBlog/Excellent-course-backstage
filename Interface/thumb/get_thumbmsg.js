
//引入数据库操作对象
var thumb = require('../../data_base/thumb/data_base.js')

//引入url,用于分析传入url后的参数
var url = require('url')

/*--------------------------------------入口函数--------------------------------------------*/

//获取缩略图分页总数
function getPageCount(req,res) {

    thumb.find({},function(err,data) {

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

//获取缩略图列表
function getThumbList(req,res) {

    try {

        var pageNumber = parseInt(url.parse(req.url).query.split('=')[1])

    }catch(e) {

        res.send({

            status:"error",

            msg:"请填写正确的url"

        })

        return

    }

    thumb.find({show:true},{"show":0,"_id":0}).skip((pageNumber-1)*10).limit(10).exec(function(err,data) {

        res.send({

            status:"ok",

            msg:"获取缩略图列表",

            list:data

        })

    })

}


module.exports = {

    getPageCount:getPageCount,

    getThumbList:getThumbList

}

//引入站点配置数据库操作对象
var site = require('../../data_base/site/data_base.js')

/*--------------------------------------处理数据函数--------------------------------------------*/

//处理站点信息
function handleSiteMsg(data,req,res) {

    var list = data.split('&')

    var cover_title,cover_text,main_title

    cover_title = list[0].split('=')[1]

    main_title = list[1].split('=')[1]

    cover_text = list[2].split('=')[1]

    site.updateOne({},{$set:{cover_title:cover_title,cover_text:cover_text,main_title:main_title}},function(err) {

        if(err) {

            res.send({

                status:"error",

                msg:"修改失败"

            })

        }else {

            res.send({

                status:"ok",

                msg:"修改成功"

            })

        }

    })

}

/*--------------------------------------入口函数--------------------------------------------*/

//修改站点信息
function updateSiteMsg(req,res) {

    handleSiteMsg(req.body,req,res)

}

module.exports = {

    updateSiteMsg:updateSiteMsg

}
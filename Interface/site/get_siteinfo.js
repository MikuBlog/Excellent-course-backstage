
//引入站点配置数据库操作对象
var site =require('../../data_base/site/data_base.js')

/*--------------------------------------入口函数--------------------------------------------*/

//获取站点信息
function getData(req,res) {

    site.findOne({},{"_id":0}).exec(function(err,data) {

        if(data) {

            res.send({

                status:"ok",

                msg:"站点信息",

                site:data

            })

        }else {

            res.send({

                status:"error",

                msg:"无任何站点信息"

            })

        }

    })

}

module.exports = {

    getData:getData

}
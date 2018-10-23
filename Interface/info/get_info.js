
//引入url,用于分析传入url后的参数
var url = require('url')

//获取公告数据库中的结构
var InfoList = require('../../data_base/info/data_base.js')

/*--------------------------------------入口函数--------------------------------------------*/

//获取公告总页数
function getInfoTotalPageNumber(req,res) {

    InfoList.find({show:true},function(err,data) {

        if(data.length != 0 ) {

            //成功查询返回的对象
            var obj = {

                status:"ok",

                msg:"获取公告列表",

                totalPageNumber:Math.ceil(data.length/10)

            } 

            res.send(obj)

        }else {

            res.send({

                status:"error",

                msg:"没有任何公告信息"

            })

        }

    })

}

//获取公告列表
function getInfoList(req,res) {

    //获取页码
    try {

        var pageNumber = parseInt(url.parse(req.url).query.split('=')[1])

    }catch(e) {

        res.send({

            status:"error",

            msg:"请填写正确的url"

        })

        return

    }

    //分页操作
    InfoList.find({show:true},{"_id":0,"show":0}).skip((pageNumber-1)*10).limit(10).exec(function(err,data) {

        res.send({

            status:"ok",

            msg:"获取公告列表",

            list:data

        })

    })

}

//获取单条公告详情
function getInfoMes(req,res) {

    //获取id值
    var pageNumber = parseInt(url.parse(req.url).query.split("=")[1])

    InfoList.findOne({id:pageNumber,show:true},function(err,data) {

        if(data) {

            var obj = {

                status:"ok",

                msg:"获取公告详情",

                detail:{

                    id:data.id,

                    title:data.title,

                    content:data.content

                }

            }

            res.send(obj)

        }else {

            res.send("404 Not Found")

        }

    }) 

}

//导出该文件的所有函数
module.exports = {

    getInfoTotalPageNumber:getInfoTotalPageNumber,

    getInfoList:getInfoList,

    getInfoMes:getInfoMes

}
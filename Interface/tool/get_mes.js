
//用于请求其他服务器接口的数据
var request = require('request')

//获取随机一句诗
function getPoetry(req,res) {

    request('http://qwebfx-test.deali.cn/api/utils/poem',function(err,data) {

        if(data) {

            res.send({

                status:"ok",
        
                msg:"随机获取一句诗",
        
                result:data.body
        
            })

        }else {

            res.send({

                status:"error",
        
                msg:"获取随机一句诗失败",

            })

        }

    })

}

//获取随机一言
function getSpeech(req,res) {

    request('http://qwebfx-test.deali.cn/api/utils/hitokoto',function(err,data) {

        if(data) {

            res.send({

                status:"ok",
        
                msg:"随机获取一言",
        
                result:data.body

            })

        }else {

            res.send({

                status:"error",
        
                msg:"获取随机一言失败",

            })

        }

    })

}

//获取随机图片链接
function getImg(req,res) {

    request('http://qwebfx-test.deali.cn/api/utils/img_url/300x300',function(err,data) {

        if(data) {

            res.send({

                status:"ok",
        
                msg:"随机图片链接",
        
                result:data.body

            })

        }else {

            res.send({

                status:"error",
        
                msg:"获取随机图片链接失败",

            })

        }

    })

}

//指定大小占位图
function getPlaceHolder(req,res) {

    request('http://qwebfx-test.deali.cn/api/utils/placeholder/300x300',function(err,data) {

        if(data) {

            res.writeHead(200,{"Content-Type":"image/png;charset=UTF-8"})

            res.end(data.body)

        }else {

            res.send({

                status:"error",
        
                msg:"获取随机一言失败",

            })

        }

    })

}



module.exports = {

    getPoetry:getPoetry,

    getSpeech:getSpeech,

    getImg:getImg,

    getPlaceHolder:getPlaceHolder

}

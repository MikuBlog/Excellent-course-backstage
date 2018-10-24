
//引入视频数据库操作对象
var video =require('../../data_base/video/data_base_video.js')

//引入视频分类数据库操作对象
var videotype =require('../../data_base/video/data_base_videotype.js')

//引入url,用于分析传入url后的参数
var url = require('url')

/*--------------------------------------入口函数--------------------------------------------*/

//获取视频总页数
function getVideoCount(req,res) {

    video.find({show:true},function(err,data) {

        if(data.length != 0) {

            res.send({

                status:"ok",
    
                msg:"获取视频总页数",
    
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

//获取视频列表
function getVideoList(req,res) {

    try {

        var pageNumber = parseInt(url.parse(req.url).query.split('=')[1])

    }catch(e) {

        res.send({

            status:"error",

            msg:"请填写正确的url"

        })

        return

    }

    video.find({show:true},{"_id":0,"show":0}).skip((pageNumber-1)*10).limit(10).exec(function(err,data) {

        res.send({

            status:"ok",

            msg:"获取链接列表",

            list:data

        })

    })

}

//获取视频信息
function getVideoMsg(req,res) {

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

    video.findOne({id:pageNumber,show:true},function(err,data) {

        if(data) {

            res.send({

                status:"ok",

                msg:"获取视频详情",

                videomsg:{

                    id:data.id,

                    title:data.name,

                    description:data.description,

                    upload:data.upload,

                    thumb_id:data.thumb_id,

                    category_id:data.category_id

                }

            })

        }else {

            res.send("404 Not Found")

        }

    }) 

}

//获取视频分类总页数
function getVideoTypeCount(req,res) {

    videotype.find({show:true},function(err,data) {

        if(data.length != 0) {

            res.send({

                status:"ok",
    
                msg:"获取视频总页数",
    
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

//获取视频分类列表
function getVideoTypeList(req,res) {

    try {

        var pageNumber = parseInt(url.parse(req.url).query.split('=')[1])

    }catch(e) {

        res.send({

            status:"error",

            msg:"请填写正确的url"

        })

        return

    }

    videotype.find({show:true},{"_id":0,"show":0}).skip((pageNumber-1)*10).limit(10).exec(function(err,data) {

        res.send({

            status:"ok",

            msg:"获取链接列表",

            list:data

        })

    })

}

//获取视频分类信息
function getVideoTypeMsg(req,res) {

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

    videotype.findOne({id:pageNumber,show:true},function(err,data) {

        if(data) {

            res.send({

                status:"ok",

                msg:"获取视频分类详情",

                videolistmsg:{

                    id:data.id,

                    title:data.name,

                    description:data.description,

                    thumb_id:data.thumb_id

                }

            })

        }else {

            res.send("404 Not Found")

        }

    }) 

}


module.exports = {

    getVideoCount:getVideoCount,

    getVideoList:getVideoList,

    getVideoMsg:getVideoMsg,

    getVideoTypeCount:getVideoTypeCount,

    getVideoTypeList:getVideoTypeList,

    getVideoTypeMsg:getVideoTypeMsg

}
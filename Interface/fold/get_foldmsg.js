
//引入文件数据库操作对象
var fold =require('../../data_base/fold/data_base_fold.js')

//引入文件分类数据库操作对象
var foldtype =require('../../data_base/fold/data_base_foldtype.js')

//引入url,用于分析传入url后的参数
var url = require('url')

/*--------------------------------------入口函数--------------------------------------------*/

//获取文件总页数
function getFoldCount(req,res) {

    fold.find({show:true},function(err,data) {

        if(data.length != 0) {

            res.send({

                status:"ok",
    
                msg:"获取文件总页数",
    
                count:Math.ceil(data.length/10)
    
            })

        }else {

            res.send({

                status:"error",

                msg:"没有任何文件信息"

            })

        }

    })

}

//获取文件列表
function getFoldList(req,res) {

    try {

        var pageNumber = parseInt(url.parse(req.url).query.split('=')[1])

    }catch(e) {

        res.send({

            status:"error",

            msg:"请填写正确的url"

        })

        return

    }

    fold.find({show:true},{"_id":0,"show":0}).skip((pageNumber-1)*10).limit(10).exec(function(err,data) {

        res.send({

            status:"ok",

            msg:"获取文件列表",

            list:data

        })

    })

}

//获取文件信息
function getFoldMsg(req,res) {

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

    fold.findOne({id:pageNumber,show:true},{"_id":0,"show":0}).exec(function(err,data) {

        if(data) {

            res.send({

                status:"ok",

                msg:"获取视频详情",

                foldmsg:data

            })

        }else {

            res.send({

                status:"error",

                msg:"没有找到相应文件信息"

            })

        }

    }) 

}

//获取文件分类总页数
function getFoldTypeCount(req,res) {

    foldtype.find({show:true},function(err,data) {

        if(data.length != 0) {

            res.send({

                status:"ok",
    
                msg:"获取视频分类总页数",
    
                count:Math.ceil(data.length/10)
    
            })

        }else {

            res.send({

                status:"error",

                msg:"没有任何视频分类信息"

            })

        }

    })

}

//获取文件分类列表
function getFoldTypeList(req,res) {

    try {

        var pageNumber = parseInt(url.parse(req.url).query.split('=')[1])

    }catch(e) {

        res.send({

            status:"error",

            msg:"请填写正确的url"

        })

        return

    }

    foldtype.find({show:true},{"_id":0,"show":0}).skip((pageNumber-1)*10).limit(10).exec(function(err,data) {

        res.send({

            status:"ok",

            msg:"获取文件分类列表",

            list:data

        })

    })

}

//获取文件分类信息
function getFoldTypeMsg(req,res) {

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

    foldtype.findOne({id:pageNumber,show:true},{"_id":0,"show":0}).exec(function(err,data) {

        if(data) {

            res.send({

                status:"ok",

                msg:"获取文件分类详情",

                foldtypemsg:data

            })

        }else {

            res.send({

                status:"error",

                msg:"没有找到相应文件分类信息"

            })

        }

    }) 

}


module.exports = {

    getFoldCount:getFoldCount,

    getFoldList:getFoldList,
    
    getFoldMsg:getFoldMsg,

    getFoldTypeCount:getFoldTypeCount,

    getFoldTypeList:getFoldTypeList,

    getFoldTypeMsg:getFoldTypeMsg

}
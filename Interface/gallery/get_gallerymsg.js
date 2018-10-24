
//引入视频数据库操作对象
var gallery =require('../../data_base/gallery/data_base_gallery.js')

//引入视频分类数据库操作对象
var gallerytype =require('../../data_base/gallery/data_base_gallerytype.js')

//引入url,用于分析传入url后的参数
var url = require('url')

/*--------------------------------------入口函数--------------------------------------------*/

//获取视频总页数
function getGalleryCount(req,res) {

    gallery.find({show:true},function(err,data) {

        if(data.length != 0) {

            res.send({

                status:"ok",
    
                msg:"获取图片总页数",
    
                count:Math.ceil(data.length/10)
    
            })

        }else {

            res.send({

                status:"error",

                msg:"没有任何图片信息"

            })

        }

    })

}

//获取视频列表
function getGalleryList(req,res) {

    try {

        var pageNumber = parseInt(url.parse(req.url).query.split('=')[1])

    }catch(e) {

        res.send({

            status:"error",

            msg:"请填写正确的url"

        })

        return

    }

    gallery.find({show:true},{"_id":0,"show":0}).skip((pageNumber-1)*10).limit(10).exec(function(err,data) {

        res.send({

            status:"ok",

            msg:"获取图片列表",

            list:data

        })

    })

}

//获取视频信息
function getGalleryMsg(req,res) {

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

    gallery.findOne({id:pageNumber,show:true},{"_id":0,"show":0}).exec(function(err,data) {

        if(data) {

            res.send({

                status:"ok",

                msg:"获取图片详情",

                Gallerymsg:data

            })

        }else {

            res.send({

                status:"error",

                msg:"没有找到相应图片信息"

            })

        }

    }) 

}

//获取视频分类总页数
function getGalleryTypeCount(req,res) {

    gallerytype.find({show:true},function(err,data) {

        if(data.length != 0) {

            res.send({

                status:"ok",
    
                msg:"获取图片分类总页数",
    
                count:Math.ceil(data.length/10)
    
            })

        }else {

            res.send({

                status:"error",

                msg:"没有任何图片分类信息"

            })

        }

    })

}

//获取视频分类列表
function getGalleryTypeList(req,res) {

    try {

        var pageNumber = parseInt(url.parse(req.url).query.split('=')[1])

    }catch(e) {

        res.send({

            status:"error",

            msg:"请填写正确的url"

        })

        return

    }

    gallerytype.find({show:true},{"_id":0,"show":0}).skip((pageNumber-1)*10).limit(10).exec(function(err,data) {

        res.send({

            status:"ok",

            msg:"获取图片分类列表",

            list:data

        })

    })

}

//获取视频分类信息
function getGalleryTypeMsg(req,res) {

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

    gallerytype.findOne({id:pageNumber,show:true},{"_id":0,"show":0}).exec(function(err,data) {

        if(data) {

            res.send({

                status:"ok",

                msg:"获取图片分类详情",

                Gallerytypemsg:data

            })

        }else {

            res.send({

                status:"error",

                msg:"没有找到相应图片分类信息"

            })

        }

    }) 

}


module.exports = {

    getGalleryCount:getGalleryCount,

    getGalleryList:getGalleryList,

    getGalleryMsg:getGalleryMsg,

    getGalleryTypeCount:getGalleryTypeCount,

    getGalleryTypeList:getGalleryTypeList,

    getGalleryTypeMsg:getGalleryTypeMsg

}
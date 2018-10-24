
//连接数据库
require('./data_base/data_base_server.js')

/*--------------------------------------引入中间件方法--------------------------------------------*/

//中间件
var middleWare = require('./Interface/middleware/middleware.js')

/*--------------------------------------引入公告方法--------------------------------------------*/

//获取公告详情方法
var getInfo = require('./Interface/info/get_info.js')

//获取修改公告方法
var postInfo = require('./Interface/info/post_info.js')

/*--------------------------------------引入工具方法--------------------------------------------*/

//获取通用工具方法
var tool = require('./Interface/tool/get_mes.js')

/*--------------------------------------引入站点方法--------------------------------------------*/

//获取站点信息方法
var getSite = require('./Interface/site/get_siteinfo.js')

//获取修改站点信息方法
var postSite = require('./Interface/site/post_siteinfo.js')

/*--------------------------------------引入用户方法--------------------------------------------*/

//获取用户登录注册方法
var postUser = require('./Interface/user/post_usermsg.js')

/*--------------------------------------引入页面方法--------------------------------------------*/

//获取页面信息方法
var getPage = require('./Interface/page/get_pagemsg.js')

//获取页面修改方法
var postPage = require('./Interface/page/post_pagemsg.js')

/*--------------------------------------引入缩略图方法--------------------------------------------*/

//获取缩略图信息方法
var getThumb = require('./Interface/thumb/get_thumbmsg.js')

//获取缩略图修改方法
var postThumb = require('./Interface/thumb/post_thumbmsg.js')

/*--------------------------------------引入链接方法--------------------------------------------*/

//引入链接信息方法
var getLink = require('./Interface/link/get_linkmsg.js')

//引入链接修改方法
var postLink = require('./Interface/link/post_linkmsg.js')

/*--------------------------------------引入视频方法--------------------------------------------*/

//引入视频信息方法
var getVideo = require('./Interface/video/get_videomsg.js')

//引入视频修改信息方法
var postVideo = require('./Interface/video/post_videomsg.js')

/*--------------------------------------引入express框架--------------------------------------------*/

var express = require('express')

var app = express()

/*--------------------------------------引入中间件--------------------------------------------*/

//静态资源中间件
app.use(express.static(__dirname))

/*--------------------------------------公告接口--------------------------------------------*/

//获取公告总数接口
app.get('/api/announcement/count',getInfo.getInfoTotalPageNumber)

//获取公告列表
app.get('/api/announcement/list',getInfo.getInfoList)

//获取公告详情
app.get('/api/announcement/get',getInfo.getInfoMes)

//添加公告
app.post('/api/announcement/add',middleWare.getData,postInfo.addInfo)

//修改公告
app.post('/api/announcement/update',middleWare.getData,postInfo.updateInfo)

//删除公告
app.post('/api/announcement/delete',middleWare.getData,postInfo.deleteInfo)

/*--------------------------------------通用工具接口--------------------------------------------*/

//获取随机一句诗歌
app.get('/poem/get',tool.getPoetry)

//获取随机一句话 
app.get('/speech/get',tool.getSpeech)

//获取随机图片url
app.get('/image/get',tool.getImg)

//获取占位图
app.get('/placeholder/get',tool.getPlaceHolder)

/*--------------------------------------用户接口--------------------------------------------*/

//用户注册
app.post('/api/user/create',middleWare.getData,postUser.createUser)

//用户登录
app.post('/api/user/login',middleWare.getData,postUser.Login)

/*--------------------------------------缩略图接口--------------------------------------------*/

//获取缩略图分页总数
app.get('/api/thumb/count',getThumb.getPageCount)

//获取缩略图列表
app.get('/api/thumb/list',getThumb.getThumbList)

//添加缩略图
app.post('/api/thumb/add',middleWare.uploadImage.single('image'),postThumb.addThumb)

//修改缩略图数据
app.post('/api/thumb/update',middleWare.getData,postThumb.updateThumb)

//删除缩略图
app.post('/api/thumb/delete',middleWare.getData,postThumb.deleteThumb)

/*--------------------------------------站点配置接口--------------------------------------------*/

//获取站点信息
app.get('/api/site/info',getSite.getData)

//修改站点信息
app.post('/api/site/update',middleWare.getData,postSite.updateSiteMsg)

/*--------------------------------------页面接口--------------------------------------------*/

//获取页面分页总页数
app.get('/api/page/count',getPage.getPageCount)

//获取页面列表
app.get('/api/page/list',getPage.getPageList)

//获取页面信息
app.get('/api/page/get',getPage.getPageDetail)

//添加页面信息
app.post('/api/page/add',middleWare.getData,postPage.addPage)

//修改页面信息
app.post('/api/page/update',middleWare.getData,postPage.updatePage)

//删除页面
app.post('/api/page/delete',middleWare.getData,postPage.deletePage)

/*--------------------------------------链接接口--------------------------------------------*/

//获取链接总页数
app.get('/api/link/count',getLink.getLinkCount)

//获取链接列表
app.get('/api/link/list',getLink.getLinkList)

//添加链接
app.post('/api/link/add',middleWare.getDataNewVersion,postLink.addLink)

//修改链接
app.post('/api/link/update',middleWare.getDataNewVersion,postLink.updateLink)

//删除链接
app.post('/api/link/delete',middleWare.getDataNewVersion,postLink.deleteLink)

/*--------------------------------------视频接口--------------------------------------------*/

//获取视频总页数
app.get('/api/video/count',getVideo.getVideoCount)

//获取视频列表
app.get('/api/video/list',getVideo.getVideoList)

//获取视频详情
app.get('/api/video/get',getVideo.getVideoMsg)

//获取视频分类总页数
app.get('/api/video/category/count',getVideo.getVideoTypeCount)

//获取视频分类列表
app.get('/api/video/category/list',getVideo.getVideoTypeList)

//获取视频分类详情
app.get('/api/video/category/get',getVideo.getVideoTypeMsg)

//添加视频
app.post('/api/video/add',middleWare.uploadVideo.single('video'),postVideo.addVideo)

//修改视频信息
app.post('/api/video/update',middleWare.getDataNewVersion,postVideo.updateVideo)

//删除视频
app.post('/api/video/delete',middleWare.getDataNewVersion,postVideo.deleteVideo)

//添加视频分类
app.post('/api/video/category/add',middleWare.getDataNewVersion,postVideo.addVideoType)

//修改视频分类
app.post('/api/video/category/update',middleWare.getDataNewVersion,postVideo.updateVideoType)

//删除视频分类
app.post('/api/video/category/delete',middleWare.getDataNewVersion,postVideo.deleteVideoType)


app.listen(8888)
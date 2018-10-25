
var menu = require('../../data_base/menu/data_base.js')

/*--------------------------------------入口函数--------------------------------------------*/

//获取菜单列表
function getMenuList(req,res) {

    menu.find({show:true},{"_id":0,"show":0}).exec(function(err,data) {

        if(data.length != 0) {

            res.send({

                status:"ok",

                msg:"获取菜单列表",

                menulist:data

            })

        }else {

            res.send({

                status:"error",

                msg:"没有任何菜单列表信息"

            })

        }

    })

}

module.exports = {

    getMenuList:getMenuList

}
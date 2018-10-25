
var menu = require('../../data_base/menu/data_base.js')

/*--------------------------------------数据处理函数--------------------------------------------*/

//处理修改菜单列表数据
function updateData(obj,req,res) {

    if(obj.menu.length == 0 ) {

        res.send({

            status:"error",

            msg:"菜单列表为空,请上传菜单列表"

        })

        return

    }else {

        var list = obj.menu

        for(var i = 0 ; i < list.length ; i ++) {

            if(list[i].id == "" || list[i].title == "" || list[i].index == "") {

                res.send({

                    status:"error",

                    msg:"菜单信息出错!"

                })

                return

            }

        }

    }

    obj.menu.forEach(function(value) {

        menu.create(value,function(err) {

            if(err) {

                res.send({

                    status:"error",

                    msg:"菜单添加失败！"

                })

            }else {

                res.send({

                    status:"ok",

                    msg:"菜单添加成功！"

                })

            }

        })

    })

}


/*--------------------------------------入口函数--------------------------------------------*/

//修改菜单列表
function updateMenuList(req,res) {

    updateData(req.body,req,res)

}

module.exports = {

    updateMenuList:updateMenuList

}
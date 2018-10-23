
//引入用户数据库操作对象
var user = require('../../data_base/user/data_base.js')


/*--------------------------------------处理数据函数--------------------------------------------*/


//处理用户注册信息
function handleUserRegisterMsg(data,req,res) {

    var list = data.split('&')

    var username,password,email

    username = list[0].split('=')[1]

    password = list[1].split('=')[1]

    email = list[2].split('=')[1]

    if(username == "" || password == "" || email == "") {

        res.send({

            status:"error",

            msg:"表单数据无效"

        })

        return

    }

    user.create({

        username:username,

        password:password,

        email:email

    },function(err) {

        if(err) {

            res.send({

                status:"error",

                msg:"创建用户失败!"

            })

        }else {

            res.send({

                status:"ok",

                msg:"创建用户成功!",

                usermsg: {

                    username:username,

                    password:password,

                    email:email

                }

            })

        }

    })

}

//处理用户登录信息
function handleUserLoginMsg(data,req,res) {

    var list = data.split('&')

    var username,password

    username = list[0].split('=')[1]

    password = list[1].split('=')[1]

    if(username=="" || password == "") {

        res.send({

            status:"error",

            msg:"输入的用户名或密码为空!"

        })

        return

    }

    user.findOne({username:username,password:password},function(err,data) {

        if(data) {

            res.send({

                status:"ok",

                msg:"用户登录成功!",

                usermsg: {

                    username:data.username,

                    password:data.password,

                    email:data.email

                }

            })

        }else {

            res.send({

                status:"error",

                msg:"用户账号或密码错误!",

            })

        }

    })

}


/*--------------------------------------入口函数--------------------------------------------*/

//创建用户
function createUser(req,res) {

    handleUserRegisterMsg(req.body,req,res)

}

//用户登录
function Login(req,res) {

    handleUserLoginMsg(req.body,req,res)

}

module.exports = {

    createUser:createUser,

    Login:Login

}
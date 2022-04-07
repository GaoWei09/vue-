var express = require('express');
var router = express.Router();

let crypto = require("crypto")
let jwt = require("jsonwebtoken")

let userService = require("../service/userService");
const { json } = require('express');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


// 只有管理员有权限进行新增测试和开发
router.post("/register", (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, "abc", async (err, info) => {
    if (err) {
      // res.json({
      //   code: 0,
      //   token: "token"
      // })
      let { username, type, userpwd = "123456" } = req.body;

        let md5 = crypto.createHash("md5");
        userpwd = md5.update(userpwd).digest("hex");

        //查询用户是否存在
        let list = await userService.query({ username });
        if (list.length) {
          res.json({
            code: 0,
            msg: "用户名已存在"
          })
        } else {
          let data = await userService.insert({ username, userpwd, type });
          res.json({
            code: 1,
            msg: "注册成功",
            data
          })
        }
    } else {
      if (info.type == 1) {
        let { username, type, userpwd = "123456" } = req.body;

        let md5 = crypto.createHash("md5");
        userpwd = md5.update(userpwd).digest("hex");

        //查询用户是否存在
        let list = await userService.query({ username });
        if (list.length) {
          res.json({
            code: 0,
            msg: "用户名已存在"
          })
        } else {
          let data = await userService.insert({ username, userpwd, type });
          res.json({
            code: 1,
            msg: "注册成功",
            data
          })
        }
      } else {
        res.json({
          code: 0,
          msg: "权限不够"
        })
      }
    }
  })

})

// 测试用户信息的注册
// router.post("/register", async (req, res, next) => {
//   let md5 = crypto.createHash("md5");
//   let userpwd = md5.update("123456").digest("hex");
//   let data = await userService.insert({ username: "yiyang", userpwd, type: 2 });
//   res.json({
//     code: 1,
//     msg: "注册成功",
//     data
//   })
// })

router.post("/login", async (req, res, next) => {
  let { username, userpwd } = req.body;

  let md5 = crypto.createHash("md5");
  userpwd = md5.update(userpwd).digest("hex");

  let list = await userService.query({ username, userpwd });
  if (list.length) {


    let info = list[0]   //登录验证成功后取出用户信息  存入token
    // 用户信息存入token 并返回给前端
    let token = jwt.sign({ username: info.username, userid: info._id, type: info.type }, "abc", { expiresIn: 60 * 60 })

    res.json({
      code: 1,
      token,
      username,
      msg: "登录成功",
      path: info.type
    })
  } else {
    res.json({
      code: 0,
      msg: "用户名密码不匹配"
    })
  }
})

router.get("/manage", (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, "abc", async (err, info) => {
    if (err) {
      res.json({
        code: 0,
        token: "token"
      })
    } else {
      if (info.type == 1) {

        let list = await userService.query({});
        res.json({
          code: 1,
          msg: "查询成功",
          data: list
        })

      } else {
        res.json({
          code: 0,
          msg: "权限不够"
        })
      }
    }
  })

})


module.exports = router;

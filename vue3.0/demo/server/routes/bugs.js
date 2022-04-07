var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");


let bugService = require("../service/bugService");


router.post("/add", (req, res, next) => {
    let { token } = req.headers;
    jwt.verify(token, "abc", async (err, info) => {
        if (err) {
            res.json({
                code: 0,
                msg: "token有误"
            })
        } else {
            if (info.type == 3) {
                let { username,value, start, extend, bugreason, type = 1 } = req.body;
                let data = await bugService.insert({
                    username,
                    value,
                    start,
                    extend,
                    bugreason,
                    type
                });
                res.json({
                    code: 1,
                    msg: "新增成功",

                })

            } else {
                res.json({
                    code: 0,
                    msg: "权限不足"
                })
            }
        }
    })
});


router.get("/all", (req, res, next) => {
    let { token } = req.headers;
    jwt.verify(token,"abc",async (err,info)=>{
        if(err){
            res.json({
                code:0,
                msg:"token有误"
            })
        }else{
            if(info.type==1||info.type==2||info.type==3){
                let {key,page,shownum,type}=req.query;
                let skipnum=(page-1)*shownum;   //跳过的条数

                let params={};   //查询条件
                let reg=new RegExp(key);
                params.username=reg;
                if(type){
                    params.type=type*1;
                }
                let data=await bugService.queryall(
                    params,skipnum,shownum*1
                );
                let count=await bugService.count(params);
                res.json({
                    code:1,
                    msg:"查询所有bug成功",
                    data,
                    total:count
                })    
            }else{
                res.json({
                    code:0,
                    msg:"权限不够"
                })
            }
        }
    })

})


router.get("/develop",(req,res,next)=>{
    let {token}=req.headers;
    jwt.verify(token,"abc",async (err,info)=>{
        if(err){
            res.json({
                code:0,
                msg:"token有误"
            })
        }else{
            if(info.type==2){
                let data=await bugService.query({username:info.username});
                res.json({
                    code:1,
                    msg:"查询成功",
                    data
                })
            }else{
                res.json({
                    code:0,
                    msg:"权限不够"
                })
            }
        }
    })
})

router.get("/group",async (req,res,next)=>{
    let data=await bugService.group()
    res.json({
        code:1,
        msg:"成功",
        data
    })
})

router.patch("/update",(req,res,next)=>{
    let {token}=req.headers;
    jwt.verify(token,"abc",async (err,info)=>{
        if(err){
            res.json({
                code:0,
                msg:"token有误"
            })
        }else{
            if(info.type==2||info.type==3){
                let {type,_id}=req.body;
                let data=await bugService.update({_id},{$set:{type}});
                if(data.nModified){
                    res.json({
                        code:1,
                        msg:"修改成功",
                    })
                }else{
                    res.json({
                        code:0,
                        msg:"修改失败"
                    })
                }
            }else{
                res.json({
                    code:0,
                    msg:"权限不够"
                })
            }
        }
    })
})



    






module.exports = router;
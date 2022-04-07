
let mongoose=require("./index");

let userSchema=new mongoose.Schema({
    username:String,
    userpwd:String,
    type:Number
})

module.exports=mongoose.model("userinfo",userSchema)
//在数据库中会有一张名称为userinfos的表

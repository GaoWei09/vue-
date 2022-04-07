
let mongoose = require("./index");

let bugSchema = new mongoose.Schema({
    username: String,  //指定开发修改
    bugreason: String,  //bug原因
    start: Date,     //bug创建时间
    extend: String,    //附件
    type: Number,   //bug的状态
    value: String // bug等级
})

module.exports = mongoose.model("buginfo", bugSchema)
//在数据库中会有一张名称为buginfos的表
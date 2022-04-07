
let bugTable = require("../model/bugTable")

module.exports = {
    insert: info => bugTable.insertMany([info]),
    query: params => bugTable.find(params),
    // queryall: (params, skipnum, shownum) => {
    //     return bugTable.find(params).skip(skipnum).limit(shownum)
    // },
    update:(params1,params2)=>bugTable.updateOne(params1,params2),
    group:()=>{//根据用户来分组统计请假次数
        return  bugTable.aggregate([
            {
                $group:
                {
                    _id: "$username",//_id不能变  $username
                    count: { $sum: 1 }//类似于.count 但这是是管道函数　　所以还需要加上$sum关键词
                },
            },
        ])

    },
    queryall: (params, skipnum, shownum) => {
        return bugTable.find(params).skip(skipnum).limit(shownum)
    },

    count: (params) => {
        return bugTable.find(params).count();//获取数据总数
    },

}
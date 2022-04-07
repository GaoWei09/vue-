let userTable=require("../model/userTable");


module.exports={
    query:params=>userTable.find(params),

    insert:info=>userTable.insertMany([info]),

    insertmany:info=>userTable.insertMany(info)
}

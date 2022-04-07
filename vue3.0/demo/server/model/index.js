
let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/12-item", { useNewUrlParser: true,useUnifiedTopology: true  })

module.exports = mongoose;



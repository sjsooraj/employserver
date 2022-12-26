var Mongoose = require("mongoose");
var studentSchema = Mongoose.Schema(
    {
        name:String,
        location:String,
        position:String,
        salary:{
            type:Number,
            required:true
        }
    }
);

var employeModel = Mongoose.model(  "Students",studentSchema);
module.exports={employeModel};
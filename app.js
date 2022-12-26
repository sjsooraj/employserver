// Task1: initiate app and run server at 3000

var express = require("express");
var Bodyparser = require("body-parser");
var Mongoose = require("mongoose");
var Cors = require("cors");
var { request } = require("express");
var { employeModel } = require("./model/employeelist");

var app = new express();

app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}))

app.use(Cors());

// Task2: create mongoDB connection 
Mongoose.connect("mongodb+srv://Sjsooraj123:Sooraj123@cluster0.j0lt8tq.mongodb.net/SudentDB?retryWrites=true&w=majority",{
    useNewUrlParser:true
});

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below






//TODO: get data from db  using api '/api/employeelist'
app.get('/viewall',(req,res)=>{
    employeModel.find(
       (err,data)=>{
           if (err) {
               res.json({"Status":"Error","Error":err})
           } else {
               res.json(data)
           }
       }
       
   )
})



//TODO: get single data from db  using api '/api/employeelist/:id'
app.post('/search',(req,res)=>{
    var data = req.body 
    employeModel.find(data,
        (err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
                res.json(data)
            }
        }
        
    )
})




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/add',async(req,res)=>{
    var data=req.body 
    var student =new employeModel(data)
    await student.save(
        (err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
                res.json({"Status":"Success","Data":data})
            }
        }
    )
    console.log(data)
   
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/delete',(req,res)=>{
    var admissionNo=req.body.admissionNo;
    var data =req.body
     employeModel.findOneAndDelete(
        {"admissionNo":admissionNo},data,(err,data)=>{
            if (err) {
               res.json({"Status":"Error","Error":err}) 
            } else {
                res.json({"Status":"Updated","Data":data})
            }
        }
    
        )
})



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put("/update",(req,res)=>{

    var admissionNo=req.body.admissionNo;
    var data =req.body
     employeModel.findOneAndUpdate(
        {"admissionNo":admissionNo},data,(err,data)=>{
            if (err) {
               res.json({"Status":"Error","Error":err}) 
            } else {
                res.json({"Status":"Updated","Data":data})
            }
        }
        )
    
})

app.listen(3000,()=>{
    console.log("server started")
})
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});




"use strict"

var fs = require("fs");

var data = "mapbar_front 全栈"
fs.writeFile("output.txt",data,function(err){
    if(err){
        console.log(err);
    }else{
        console.log("file writes sucess!!")
    }
})

// 读取文件
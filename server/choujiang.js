"use strict";
const express = require('express')
const Router = express.Router()
var fs = require("fs");


function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}


function setFile(fileData) {
    fs.writeFile("../js/allUser.js", JSON.stringify(fileData), function(err) {
        if (err) {
            // throw err;
            console.log(err);
            // return res.json({ code: 0, data: doc })
        } else {
            console.log("file writes sucess!!")
                // return res.json({ code: 0, data: doc })
        }
    })
}

function setRewardFile(fileData) {
    fs.writeFile("../js/zhongjiang.js", fileData, function(err) {
        if (err) {
            // throw err;
            console.log(err);
            // return res.json({ code: 0, data: doc })
        } else {
            console.log("file writes sucess!!")
                // return res.json({ code: 0, data: doc })
        }
    })
}

// 所有数据的接口
Router.get('/data', function(req, res) {
    var allPeople = fs.readFileSync('../js/allUser.js', 'utf-8')
    if (allPeople.length > 0) {
        allPeople = JSON.parse(allPeople)
    } else {
        allPeople = []
    }
    return res.json({ code: 0, data: allPeople })
})

// 添加
Router.get('/data/save', function(req, res) {
    var allPeople = fs.readFileSync('../js/allUser.js', 'utf-8')
    if (allPeople.length > 0) {
        allPeople = JSON.parse(allPeople)
    } else {
        allPeople = []
    }
    allPeople.push(req.query)
    setFile(allPeople)
    return res.json({ code: 0, data: allPeople })
})


//  删除  
Router.get('/data/delete', function(req, res) {
    var allPeople = fs.readFileSync('../js/allUser.js', 'utf-8')
    if (allPeople.length > 0) {
        allPeople = JSON.parse(allPeople)
    } else {
        allPeople = []
    }
    var doc = []
    var id = parseInt(req.query.id)
    allPeople.map(function(val, index) {
        if (id != index) {
            doc.push(val)
        } else {
            console.log('del' + val)
        }
    })
    setFile(doc)
    return res.json({ code: 0, data: doc })
})


// 修改
Router.get('/data/edit', function(req, res) {
    var allPeople = fs.readFileSync('../js/allUser.js', 'utf-8')
    if (allPeople.length > 0) {
        allPeople = JSON.parse(allPeople)
    } else {
        allPeople = []
    }
    var id = parseInt(req.query.id)
    allPeople[id] = { name: req.query.name, tel: req.query.tel }
    setFile(allPeople)
    return res.json({ code: 0, data: allPeople })
})

// 获取中奖号码
Router.get('/zhongjiang', function(req, res) {
        var zhongjiang = fs.readFileSync('../js/zhongjiang.js', 'utf-8')
        return res.json({ code: 0, data: zhongjiang })
    })
    // 删除中奖号码
Router.get('/zhongjiang/del', function(req, res) {
        setRewardFile('')
        var zhongjiang = fs.readFileSync('../js/zhongjiang.js', 'utf-8')
        return res.json({ code: 0, data: zhongjiang })
    })
    // 修改中奖号码
Router.get('/zhongjiang/add', function(req, res) {
    var id = req.query.id
    setRewardFile(id)
    var zhongjiang = fs.readFileSync('../js/zhongjiang.js', 'utf-8')
    return res.json({ code: 0, data: zhongjiang })
})

// 生成序号
Router.get('/zhongjiang/create', function(req, res) {
    var num = req.query.num
        // var allPeople[id] = { name: req.query.name, tel: req.query.tel }
    var allPeople = []
    for (var i = 0; i < num; i++) {
        console.log(PrefixInteger(i, 3))
        allPeople[i] = { indexNum: PrefixInteger((i+1), 3), name: '张三', tel: '13888888888' }
    }
    setFile(allPeople)
    return res.json({ code: 0, data: allPeople })
})


module.exports = Router
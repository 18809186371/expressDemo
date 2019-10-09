const express = require('express');

const app = express();

// const cors = require('cors'); // 解决跨域问题

const bodyParser = require('body-parser') // 解析request body

const conn = require('./module')

const middleWare = require('./middleWare/middleWare')

app.use(middleWare.allowCrossDomain)
app.use(middleWare.logMiddleWare)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let resdata = { errorCode: "0", errMsg: '' }

app.post('/api/register', (req, res) => {
    const register = req.body
    const createTime = moment().format('YYYY-MM-DD HH:mm:ss')
    const queryStr = 'insert into userlist values(name, age, gender, brithday, hobby, userName, passWord, createTime)'
    conn.query(queryStr, register, (err, result) => {
        if (err) resdata.errorCode = "0", resdata.errMsg = err.message
        resdata.errorCode = "1", resdata.errMsg = err.message
        res.json(resdata)
    })
})

app.get('/api/allUser', (req, res) => {
    const queryStr = 'select * from userlist';
    conn.query(queryStr, (err, result) => {
        if (err) resdata.errorCode = "0", resdata.errMsg = err.message;
        resdata.errorCode = "1", resdata.errMsg = 'query success', resdata.dataList = result;
        res.json(resdata)
    })
})

app.post('/api/login', (req, res) => {
    const queryStr = 'select * from userlist';
    conn.query(queryStr, (err, result) => {
        if(err) resdata.errorCode = "0", resdata.errMsg = err.message;
        let rowData = result.find(x => x.userName === req.body.username)
        if(!rowData) {
            resdata.errorCode = "0", resdata.errMsg = '用户名不存在';
        } else {
            if(rowData.passWord === req.body.password) {
                resdata.errorCode = "1", resdata.errMsg = '登陆成功!';
            } else {
                resdata.errorCode = "0", resdata.errMsg = '密码错误!';
            }
        }
        res.json(resdata)
    })
})

app.get('/log', (req, res) => {
    const queryStr = 'select * from logger'
    conn.query(queryStr, (err, result) => {
        if(err) resdata.errorCode = '0', resdata.errMsg = '查询失败'
        resdata.errorCode = '1', resdata.errMsg = '查询成功', resdata.dataList = result
        res.json(resdata)
    })
})

app.listen(4000, () => {
    console.log('server is running at localhost:4000')
})
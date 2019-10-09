const express = require('express')

const Router = express.Router()

const conn = require('../module')

const resdata = { errorCode: "0", errMsg: '' }

Router.post('/api/register', (req, res) => {
    const register = req.body
    const createTime = moment().format('YYYY-MM-DD HH:mm:ss')
    const queryStr = 'insert into userlist values(name, age, gender, brithday, createTime, hobby, userName, passWord)'
    conn.query(queryStr, register, (err, result) => {
        if(err) resdata.errorCode = "0", resdata.errMsg = err.message
        resdata.errorCode = "1", resdata.errMsg = err.message
        res.json(resdata)
    })
})

Router.get('/api/allUser', (req, res) => {
    const queryStr = 'select * from userlist';
    conn.query(queryStr, (err, result) => {
        if(err) resdata.errorCode = "0", resdata.errMsg = err.message;
        resdata.errorCode = "1", resdata.errMsg = err.message, resdata.dataList = result;
        res.json(resdata)
    })
})
const conn = require('../module')

allowCrossDomain = (req, res, next) => { // 跨域中间件
    res.header('Access-Control-Allow-Origin', '*'); //自定义中间件，设置跨域需要的响应头。
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS'); // 默认只对get请求有跨域处理
    next();
}

logMiddleWare = (req, res, next) => { // 日志中间件
    let obj = { holdTime: new Date(), holdUser: '王栋', type: req.url }
    let queryStr = `INSERT INTO log ( holdTime, holdUser, type ) VALUES ( ${new Date().toLocaleString()}, '王栋', '${req.url}' );`

    // let queryStr = `insert into person (name,age,gender) values ('王栋', 18, '男')`
    conn.query(queryStr, (err, result) => { 
        if (err) {
            console.log('插入log表失败!, 原因' + err.message)
        } else {
            console.log('插入log表成功!')
        }
        console.log(result)
    })
    next()
}

module.exports = {
    allowCrossDomain,
    logMiddleWare
}


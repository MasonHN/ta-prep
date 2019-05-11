const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jcm800mason',
  database: 'todolist'
})




module.exports.con = con
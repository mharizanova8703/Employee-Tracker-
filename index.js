const inquirer = require('inquirer')
const mysql = require('mysql2')
const cTable = require('console.table')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '8703140618Mari@',
  database: 'employees_db',
})

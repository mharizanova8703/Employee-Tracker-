const inquirer = require('inquirer')
const mysql = require('mysql2')
const cTable = require('console.table')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '8703140618Mari@',
  database: 'employees_db',
})
connection.connect(function (err) {
  if (err) throw err
  console.log('connected as id ' + connection.threadId)

  //after which function that will be the connection end
  showTable()
})
function showTable() {
  inquirer
    .prompt({
      type: 'list',
      choices: [
        'View departments',
        'View roles',
        'View employees',
        'Add department',
        'Add role',
        'Add employee',
        'Update employee role',
        'Quit',
      ],
      message: 'Make your choice to get started:?',
      name: 'option',
    })
    .then(function (result) {
      console.log('You entered: ' + result.option)
      switch (result.option) {
        case 'Add department':
          addDepartment()
          break
        case 'Add role':
          addRole()
          break
        case 'Add employee':
          addEmployee()
          break
        case 'View departments':
          viewDepartment()
          break
        case 'View roles':
          viewRoles()
          break
        case 'View employees':
          viewEmployees()
          break
        case 'Update employee role':
          updateEmployee()
          break
        default:
          done()
      }
    })
}

function viewDepartment() {
  let query = 'SELECT * FROM departments'
  connection.query(query, function (err, res) {
    if (err) throw err
    console.table(res)
    showTable()
  })
}

function viewRoles() {
  let query = 'SELECT * FROM roles'
  connection.query(query, function (err, res) {
    if (err) throw err
    console.table(res)
    showTable()
  })
}
function viewEmployees() {
  let query = 'SELECT * FROM employees'
  connection.query(query, function (err, res) {
    if (err) throw err
    console.table(res)
    showTable()
  })
  //function addDepartment()
  //function addRole()
  //function addEmployee()
  //function updateEmployee()

  //function done() {
  //connection.end()
  // process.exit()
}

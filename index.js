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
function dispTable() {
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


function viewDepartment()
function viewRoles()
function viewEmployees()
function addDepartment()
function addRole()
function addEmployee()
function updateEmployee()

function done() {
  connection.end()
  process.exit()
}
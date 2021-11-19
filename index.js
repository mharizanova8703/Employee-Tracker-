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
}
function addDepartment() {
  inquirer
    .prompt({
      type: 'input',
      message: 'What is the name of the department?',
      name: 'deptname',
    })
    .then(function (answer) {
      connection.query(
        'INSERT INTO departments(deptname) VALUES (?)',
        [answer.deptname],
        function (err, res) {
          if (err) throw err
          // console.log(res)
          showTable()
        },
      )
    })
}

function addRole() {
  var departmentchoices = []
  connection.query(`SELECT  deptname  FROM departments`, function (err, res) {
    if (err) throw err
    for (let i = 0; i < res.length; i++) {
      departmentchoices.push(res[i].deptname)
    }

    console.log(departmentchoices)
  })

  inquirer
    .prompt([
      {
        type: 'input',
        message: "What's the name of the role?",
        name: 'title',
      },
      {
        type: 'input',
        message: 'What is the salary for this role?',
        name: 'salary',
      },
      {
        type: 'list',
        message: 'What department is this role in?',
        choices: departmentchoices,
        name: 'department_id',
      },
    ])
    .then(function (answer) {
      connection.query(
        'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
        [answer.title, answer.salary, answer.department_id],
        function (err, res) {
          if (err) throw err
          console.table(res)
          showTable()
        },
      )
    })
}
//function to add employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: "What's the employee's First Name :?",
        name: 'first_name',
      },
      {
        type: 'input',
        message: "What is the employee's Last name?",
        name: 'last_name',
      },
      {
        type: 'input',
        message: 'What is the employees job title?',
        name: 'role_id',
      },
      {
        type: 'input',
        message: 'Who is the employees manager?',
        name: 'manager_id',
      },
    ])
    .then(function (answer) {
      connection.query(
        'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [
          answer.first_name,
          answer.last_name,
          answer.role_id,
          answer.manager_id,
        ],
        function (err, res) {
          if (err) throw err
          // console.table(res)
          showTable()
        },
      )
    })
}
//function to update
function updateEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Which employee would you like to update?',
        name: 'updateName',
      },

      {
        type: 'input',
        message: 'What do you want to update to?',
        name: 'updateRole',
      },
    ])
    .then(function (answer) {
      connection.query(
        'UPDATE employees SET role_id=? WHERE first_name= ?',
        [answer.updateRole, answer.updateName],
        function (err, res) {
          if (err) throw err
          console.table(res)
          showTable()
        },
      )
    })
}

//function addDepartment()
//function addRole()
//function addEmployee()
//function updateEmployee()

function done() {
  connection.end()
  process.exit()
}

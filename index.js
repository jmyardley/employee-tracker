const mysql = require("mysql");
const inquirer = require("inquirer");

var deptIDs = ['0'];
var roleIDs = ['0'];
var employeeIDs = ['0'];

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "tracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    init();
});
function init() {
    inquirer
        .prompt({
            name: "firstAction",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add", "View", "Update", "Exit"]
        })
        .then(function (answer) {
            if (answer.firstAction === "Add") {
                addItem();
            } else if (answer.firstAction === "View") {
                viewItem();
            } else if (answer.firstAction === "Update") {
                updateRole();
            } else {
                connection.end();
            }
        })

}

//adding section 
function addItem() {
    inquirer
        .prompt({
            name: "itemType",
            type: "list",
            message: "What would you like to add?",
            choices: ["Department", "Role", "Employee"]
        })
        .then(function (answer) {
            if (answer.itemType === "Department") {
                addDepartment();
            } else if (answer.itemType === "Role") {
                addRole();
            } else if (answer.itemType === "Employee") {
                addEmployee();
            }
        });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What is the department name?"
            }
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.name
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department was added successfully!");
                    var newDeptID = deptIDs.length;
                    deptIDs.push(newDeptID.toString());
                    console.log(deptIDs);
                    init();
                }
            );
        });
}

function addRole() {
    let argument = deptIDs;
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the role called?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the pay?"
            },
            {
                name: "department_id",
                type: "list",
                message: "What is the department?",
                choices: argument
            },

        ]).then(function (answer) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.title,
                    salary: parseInt(answer.salary),
                    department_id: answer.department_id
                },

                function (err) {
                    if (err) throw err;
                    console.log("Your role was added successfully!");
                    var newRoleID = roleIDs.length;
                    roleIDs.push(newRoleID.toString());
                    console.log(roleIDs);
                    init();
                }
            );
        });
}

function addEmployee() {
    let argument1 = roleIDs;
    let argument2 = employeeIDs;
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "role_id",
                type: "list",
                message: "What is the employee's role id?",
                choices: argument1
            },
            {
                name: "manager_id",
                type: "list",
                message: "What is the employee's manager id?",
                choices: argument2
            },


        ]).then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id
                },

                function (err) {
                    if (err) throw err;
                    console.log("Your employee was added successfully!");
                    var newEmployeeID = employeeIDs.length;
                    employeeIDs.push(newEmployeeID.toString());
                    console.log(employeeIDs);
                    init();
                }
            );
        });
}

//viewing section

function viewItem() {
    inquirer
        .prompt({
            name: "viewType",
            type: "list",
            message: "What would you like to view?",
            choices: ["Department", "Role", "Employee"]
        })
        .then(function (answer) {
            if (answer.viewType === "Department") {
                viewDepartment();
            } else if (answer.viewType === "Role") {
                viewRole();
            } else if (answer.viewType === "Employee") {
                viewEmployee();
            }
        });

}

function viewDepartment() {
    connection.query("SELECT * from department", function (err, results) {
        if (err) throw err;
        console.table(results);
        init();
    });
}

function viewRole() {
    connection.query("SELECT * from role", function (err, results) {
        if (err) throw err;
        console.table(results);
        init();
    });
}

function viewEmployee() {
    connection.query("SELECT * from employee", function (err, results) {
        if (err) throw err;
        console.table(results);
        init();
    });
}


//updating section
function updateRole() {
    console.log("Updating Role...!");
}


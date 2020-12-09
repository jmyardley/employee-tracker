const mysql = require("mysql");
const inquirer = require("inquirer");

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
    ]).then(function(answer){
        connection.query(
            "INSERT INTO department SET ?",
            {
              name: answer.name,
            },
            function(err) {
              if (err) throw err;
              console.log("Your department was added successfully!");
              init();
            }
          );
    });
}

//viewing section

function viewItem() {
    connection.query("SELECT * from department", function (err, results) {
        if (err) throw err;
        console.table(results);
    });
}

function updateRole(){
    console.log("Updating Role...!");
}


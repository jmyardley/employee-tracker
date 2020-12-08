const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "",
    database: "tracker_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    init();
  });
  function init() {
    connection.query("SELECT * from department", function(err, results){
        if(err) throw err;
        console.table(results);
    });
  }
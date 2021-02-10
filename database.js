let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Akhil123',
    database: 'todoapp'
});   
connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    
    console.log('Connected to the MySQL server.');
  });
  module.exports=connection;
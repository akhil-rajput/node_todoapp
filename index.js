var express = require('express'); 
var connection=require("./database")
var app = express(); 
var path = require('path');
const port = process.env.PORT||3000;

var bodyparser=require("body-parser")
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
// Static Middleware  
app.use(express.static(path.join(__dirname, 'public'))) 

//home page of todoapp
app.get('/', function (req, res, next) { 
   getAll(res);
}) 
//Editing data of tha table 
app.get('/edit/:id',(req,res)=>{
    var sql=`select *  from employees where id=?`;
    connection.query(sql, req.params.id ,(err, data, fields) => {  
        if (err) {  
          return console.error(err.message);
        }
        data.forEach(d => {
            res.render('edit',{name:d.name, id:d.id,age:d.age, city:d.city}) 
        });
      });      
      }); 
     
//Saving edited data into table
app.post('/save/:id',(req,res)=>{
    var sql=`UPDATE employees set  name = '${req.body.name}',age = '${req.body.age}', city='${req.body.city}' WHERE id='${req.params.id}'`;  
    connection.query(sql,(err, data, fields) => { 
            if (err) {    
              return console.error(err.message);
            }          
})  
  getAll(res); 
})
//Adding data page interface
app.get('/add',(req,res)=>{
      res.render('add');
})
//Adding data into table
app.post('/addrecord',(req,res)=>{
    sql=`insert into employees(name,age,city) values(?,?,?)`;
   values=[req.body.name,req.body.age,req.body.city];
   connection.query(sql ,values,(err, data, fields) => {
     if (err) {
       return console.error(err.message);
     }
   }); 
   getAll(res);
   
})
//delete row of the table by id
app.get('/delete/:id',(req,res)=>{
    var sql=`delete  from employees where id=?`;
    connection.query(sql, req.params.id ,(err, data, fields) => {  
        if (err) {
            console.log("hey there");
          return console.error(err.message);
        }
      });
      getAll(res);     
})

app.listen(port, function(err){ 
    if (err) console.log(err); 
    console.log("Server listening on PORT", port); 
});
//function to retrieve all data from table
function getAll(res){
    sql=`select * from employees`;
      connection.query(sql ,(err, data, fields) => { 
          if (err) {  
            return console.error(err.message);
          }
        res.render('index',{users:data})
        }); 
}
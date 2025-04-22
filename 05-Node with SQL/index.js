const { faker } = require("@faker-js/faker"); //require faker
const mysql = require("mysql2"); // require mysql2 package
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "/views"));


// Create the connection to database
const connection =  mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "delta_app",
    password: "   ",
  });
  

  let getRandomUser = () => { // used from faker  npm nwebsite to generate fake data 
    return [
      faker.string.uuid(),
      faker.internet.username(), 
      faker.internet.email(),
      faker.internet.password()
    ];
  };


//INSERTING NEW DATA into array of array
// let q = "INSERT INTO user (id , username , email , password) VALUES ?"; // Writtnig query in variable ofr multiple user

// let data = [];
// for (let i = 0; i<=100; i++){
//   data.push(getRandomUser()); // data of 100 random user by calling get random function
// }



//HOME ROUTE
app.get("/", (req,res) => {
  let q = `SELECT count(*) FROM user`; // to print total no of users in database
  try{
    connection.query (q, (err , result) => { // to run query
      if (err) throw err;
      let count = (result[0]["count(*)"]);
      res.render("home.ejs",{ count }); 
    }) ;
  } catch (err) {
    console.log(err);
    res.send("some error in database");
  }
});

//SHOW ROUTE
app.get("/user", (req,res) => {
  let q = `SELECT * FROM user`; // to print all data of users in database
  try{
    connection.query (q, (err , users) => { // to run query
      if (err) throw err;

      res.render("show.ejs",{ users});
    }) ;
  } catch (err) {
    console.log(err);
    res.send("some error in database");
  }
});

//EDIT ROUTE 
app.get("/user/:id/edit" , (req,res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;// to edit username
  try{
    connection.query (q, (err , result) => { // to run query
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", {user}); // user ki info template use kr payega
    }) ;
  } catch (err) {
    console.log(err);
    res.send("some erro in DB");
  }
});

//UPDATE ROUTE actual database will be updated from here
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let {password: formPass, username: newUsername} = req.body;// 
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try{
    connection.query (q, (err , result) => { // to run query
      if (err) throw err;
      let user = result[0];
      if (formPass != user.password) { //checks the psd
        res.send("WRONG password");
      } else {
        let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`; //query to update username
        connection.query(q2,(err,result) => {
          if (err) throw err;
          res.redirect("/user");
        });   
      } 
     });
     } catch (err) {
    console.log(err);
    res.send("some erro in DB");
  }
});

app.listen("8080" ,()  => {
  console.log("server is listening to port 8080");
});

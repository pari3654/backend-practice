const express = require("express");
const app = express();
const path = require("path");// to require ejs dir

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join (__dirname , "/views"));//to get views folder always on ejs directory 

app.get("/", (req,res) => {
    res.render("home.ejs");
});

app.get("/ig/:username", (req, res) =>{
    const followers = ["aman", "shraddha","riya","abhay"];
    let { username } = req.params;
    res.render("insta.ejs", { username,followers });// for sending param to insta route
});


app.listen(port, () => {
    console.log(`listening to the ${port}`);//for starting server 
});

app.get("/rolldice" , (req, res)  => {
    let diceVal = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice.ejs",  { num : diceVal });//for generating random number
});

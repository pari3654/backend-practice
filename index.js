const express = require("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({extended: true })); // for handling post request 
app.use(express.json()); // for json format data

app.get("/register", (req,res) => {
let { user, password } = req.query;
res.send(`standard GET response.Welcome ${user}!`);
});

app.get("/register", (req,res) => {
let { user, password } = req.body;
res.send(`standard POST response.Welcome ${user}!`);
});

app.listen (port, () => {
console.log(`listening to port ${port}` );
});

const express = require("express");
const app = express();

let  port = 8080;

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});

app.get("/", (req,res)  => {
    res.send("you contacted root path");
});

app.get("/home", (req,res)  => {
    res.send("you contacted  home root path");
});

app.get("/search", (req,res)  => {
    res.send("you contacted search root path");
});

app.post("/", (req,res) => {
  res.send("you sent a post request");
});


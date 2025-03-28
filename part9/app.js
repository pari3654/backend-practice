const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

app.use( (req, res, next) => {
    console.log("middleware is running");
    next();
});

//api as a query string
const checkToken = (req, res , next) => {
    let { token } = req.query;
    if (token === "giveaccess") {
        next();
    }
    throw new ExpressError(401,"ACCESS DENIED");
};



app.get("/err", (req,res) => {
    abcd = abcd;
});

app.get("/admin", (req,res) => {
    throw newExpressError(403, " acess to admin is forbidden ");
});

//mongoose error handling 
const handleValidationErr = (err) => {
        console.log("this was a validation error");
        return err;
}

app.use((err , req, res, next) => {
    console.log(err.name);
    if(err.name === "validtaionError"){
        handleValidationErr(err);
    }
    next(err);
});
 
//error handling
app.use((err, req, res, next) => {
    let { status = 500, message = "some error occurred"} = err;
    res.status(status).send(message);
});

app.get("/", (req, res) => {
    res.send();
});



app.listen(8080, () => {
    console.log("server is listening to port");
});

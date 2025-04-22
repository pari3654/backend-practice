const express =  require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid'); // requiring uuid package 
const methodOverride = require("method-override");


app.use(express.urlencoded({extended:true}));//middlewares
app.use(methodOverride("_method"));//requiring method override



app.set("view engine", "ejs");
app.set("views" , path.join(__dirname,"views"));

app.use(express.static (path.join(__dirname,"public")));

let posts = [ //arrays for different posts
{
    id: uuidv4(), // using this function for randomly creating unique id
    username: "apnacollege",
    content:"I like coding!",
},
{
    id: uuidv4(),
    username: "shraddha khapra",
    content:"success comes from small but consistent efforts!",
},
{
    id: uuidv4(),
    username: "rahul gupta",
    content:" I got selected for my first internship",
},
];


app.get ("/posts" , (req,res) => {
    res.render("index.ejs",{posts:posts}); //pass post to ejs 
});

app.get("/posts/new", (req,res) => { // for creating new post 
res.render( "new.ejs");
});

app.post("/posts", (req,res) => {
    let {username,content} = req.body; // accessing username and content from request body
    let newId = uuidv4();
    posts.push( { id: newId,username,content}) ; //adding new posts
    res.redirect("/posts") ;//redirecting to posts page
})

app.get("/posts/:id", (req,res) => {
    let { id } = req.params;
    console.log("id from param :" ,id);
    let post = posts.find((p) => p.id === id); //searching post on basis of id
     res.render("show.ejs", { post});
});

//UPDATE
app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) =>  p.id === id); 
    post.content = newContent; // updating the content
    console.log( post);
    res.redirect("/posts");
});


 //EDIT 
app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) =>  id === p.id); 
    res.render("edit.ejs" , {post});
});


//DELETE
app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => p.id!==id);
    res.redirect("/posts");
});


app.listen(port, () => {
    console.log(`app listening to the ${port}`);
});

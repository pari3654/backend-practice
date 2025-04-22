const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");// require model chat from chat.js
const methodOverride = require("method-override");

app.set("views",path.join(__dirname, "views"));
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname, "public")));// to link public folder files
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


main().then(() => {console.log("connection successfull")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
} // making connection 

//INDEX ROUTE
app.get("/chats", async (req,res) => { //asynchronus callback 
    let chats =  await Chat.find();  // it will get all collection data
   //console.log(chats);
    res.render("index.ejs", { chats });
});

//NEW ROUTE
app.get("/chats/new",(req,res) => {
    res.render("new.ejs");
});

//CREATE ROUTE
app.post("/chats", (req,res) => {
    let {from , to , msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created: new Date(),
    });


newChat
.save()
.then( (res) =>{
     console.log("chat was saved");
     })
.catch((err) => { 
    console.log(err);
});

res.redirect("/chats");
});

//EDIT ROUTE
app.get("/chats/:id/edit", async(req, res) => {
    let {id} = req.params; 
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

//UPDATE ROUTE
app.put("/chats/:id",  async (req,res) => {
    let {id} = req.params; //to find the chat by id
    let{msg:newMsg } = req.body;
    let updatedChat =  await Chat.findByIdAndUpdate(
        id,
         {msg: newMsg},
        {runValidators: true , new: true}
        );

console.log(updatedChat);
res.redirect("/chats");
    });

//DELETE ROUTE
app.delete("/chats/:id", async (req,res) => {
    let { id } = req.params; 
     let deletedChat =  await Chat.findByIdAndDelete(id);
     console.log(deletedChat);
     res.redirect("/chats");
});

app.get("/",(req,res) => {
    res.send(" root is working");
});

app.listen(8080 , () => {
    console.log("server is listening");
});

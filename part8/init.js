const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(() => {console.log("connection successfull")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
} // making connection 

let allchats = [
    {
    from: "neha",
    to:"priya",
    msg:"can you send me todays notes",
    created: new Date(),
    },
    {
    from: "manu",
    to:"tanu",
    msg:"can you send me maths notes",
    created: new Date(),
     },
    {
    from: "arya",
    to:"anvi",
    msg:"can you send me oops notes",
    created: new Date(),
    },
];

Chat.insertMany(allchats);

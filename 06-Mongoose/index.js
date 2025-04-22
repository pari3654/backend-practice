const mongoose = require('mongoose');

main().then((res) => {
    console.log("connection successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test'); // to form connection 
}

const userSchema = new mongoose.Schema({// schema-overall structure of document
  name:String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);//creating new collection

const User2 = new User({
  name:"Eve",
  email: "eve@yahoo.in",
  age: 38,
});

User.findOneAndUpdate({ name:"adam"}, {age: 50},{new : true})
.then((res) => {
  console.log(res);
})
.catch((err) => {
  console.log(err);
});



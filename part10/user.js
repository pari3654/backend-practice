const mongoose = require("mongoose");
const {Schema} = mongoose;

//setting up connection
main().then(() => 
    console.log("connection successfull"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relation');
}

const userSchema = new Schema({
    username: String,
    adresses: [
        {
            location:String,
            city:String,
        },
    ],
});

const User = mongoose.model("User", userSchema);

//one to few implementation 
const addUsers = async() => {
    let user1 = new User({
        username: "sherlockholmes",
        addresses: [{
            location: "221B baker stree",
            city:"London"
        }]
    });

    user1.adresses.push({location:" P32 wall street" , city: "London"})
    let result = await user1.save();
    console.log(result);
};

addUsers();

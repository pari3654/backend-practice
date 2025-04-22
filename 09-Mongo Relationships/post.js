const mongoose = require("mongoose");
const {Schema} = mongoose;

//setting up connection
main().then(() => 
    console.log("connection successfull"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relation');
}

//one to many implementation 
//defining the schema
const userSchema = new Schema({
    username: String,
    email: String,
});

const postSchema =  new Schema({
    content: String,
    Likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    }

});

//creating model
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("post" , postSchema);

//inserting values in model using schema
const addData = async() => {
    let user = await User.findOne({username: "rahulkumar"});
     ({
        username:"rahul",
        email:"rahul@gmail.com"
    });

    let post2 = new Post ({
        content: " great view",
        likes: 20,
    });

    post2.user = user;
     await post2.save();

};

addData();

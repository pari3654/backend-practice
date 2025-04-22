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
const orderSchema = new Schema({
    item: String,
    price: Number,
});


const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);


const addCustomer = async() => {
    let cust1 = new Customer ({
      name:" Rahul Kumar"
    });


let order1 = await Order.findOne({item: "Dosa"});
let order2 = await Order.findOne({item: "Chinese"});
let order3 = await Order.findOne({item: "Lassi"});

cust1.orders.push(order1);
cust1.orders.push(order2);
cust1.orders.push(order3);

let result = await cust1.save();
console.log(result[0]);

};

addCustomer();


// const addOrders = async() => {
//     let result = await Order.insertMany([
//         {item: "Chinese", price: 100},
//         {item: "Dosa", price: 120},
//         {item: "Lassi", price: 70}
//     ]);
//     console.log(result);
// };

// addOrders();

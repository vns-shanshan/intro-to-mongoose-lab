// 1. Defining the Schema
// 2. Compiling the model
// 3. Exporting the Model Object to be used in any file you want!
// powered by the mongoose module

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
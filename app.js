// -------------- Prompt ------------
const prompt = require("prompt-sync")();

console.log("Welcome to the CRM");
// --------------------------------

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const Customer = require("./models/customer");

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
}

function showMenu() {
    console.log("What would you like to do? ");

    console.log("1. Create a customer");
    console.log("2. View all customers");
    console.log("3. Update a customer");
    console.log("4. Delete a customer");
    console.log("5. Quit");

    const answer = prompt("Number of action to run: ");
    console.log(`# user inputs ${answer}`);

    runQueries(answer);
}

const runQueries = (answer) => {
    if (answer === "1") {
        createCustomer();
    }

    if (answer === "2") {
        viewAllCustomers();
    }

    if (answer === "3") {
        updateACustomer();
    }

    if (answer === "4") {
        deleteACustomer();
    }

    if (answer === "5") {
        quit();
    }
}

connect();
showMenu();

// ----------- Query functions -----------
async function createCustomer() {

    const customerName = prompt("What is the customer name? ");
    const customerAge = prompt("What is the customer age? ");

    const customerData = {
        name: customerName,
        age: customerAge,
    };

    const customerDocument = await Customer.create(customerData);

    console.log(`Customer Document created: `, customerDocument);

    showMenu();
}

async function viewAllCustomers() {
    const customerDocuments = await Customer.find({});

    console.log("Below is a list of customers: ");
    customerDocuments.forEach((customerDocument) => {
        console.log(`id: ${customerDocument._id} -- Name: ${customerDocument.name}, Age: ${customerDocument.age}`);
    });

    showMenu();
}

async function updateACustomer() {
    const customerDocuments = await Customer.find({});

    console.log("Below is a list of customers: ");
    customerDocuments.forEach((customerDocument) => {
        console.log(`id: ${customerDocument._id} -- Name: ${customerDocument.name}, Age: ${customerDocument.age}`);
    });

    const updateCustomerId = prompt("Copy and paste the id of the customer you would like to update here: ");
    console.log(`# user inputs ${updateCustomerId}`);

    const updatedName = prompt("What is the customer\'s new name? ");
    console.log(`# user inputs ${updatedName}`);
    const updatedAge = prompt("What is the customer\'s new age? ");
    console.log(`# user inputs ${updatedAge}`);

    await Customer.findByIdAndUpdate(
        updateCustomerId, { name: updatedName, age: updatedAge }
    );
    console.log("Updated!");

    showMenu();
}

async function deleteACustomer() {
    const customerDocuments = await Customer.find({});

    console.log("Below is a list of customers: ");
    customerDocuments.forEach((customerDocument) => {
        console.log(`id: ${customerDocument._id} -- Name: ${customerDocument.name}, Age: ${customerDocument.age}`);
    });

    const deleteCustomerId = prompt("Copy and paste the id of the customer you would like to delete here: ");
    console.log(`# user inputs ${deleteCustomerId}`);

    await Customer.findByIdAndDelete(deleteCustomerId);
    console.log("Deleted!");

    showMenu();
}

async function quit() {
    console.log("exiting...");
    mongoose.connection.close();
    console.log('Disconnected from MongoDB');
}
// ---------------------------------------
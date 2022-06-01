const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let employee = new Schema({
    name:String,
    email:String,
    designation:String,
    phnumber:String,
}, {
    collection: 'employees'
});

module.exports = mongoose.model('Employee', employee);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const path = require("path");

//connecting mongodb start
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase').then((x)=>{
    console.log('Connected to Mongo! Db name =' + x.connections[0].name)
}).catch((err)=>{
    console.error("Error Connection Mongo " + err.reason)
})
//connecting mongodb end

//setting port with express js start
const emproute = require("../backend/routes/emp.route");
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/testapp')));
app.use('/', express.static(path.join(__dirname, 'dist/testapp')));
app.use('/api', emproute);

//create port start
const port = process.env.port || 4000;
const server = app.listen(port, ()=>{
    console.log("Connected to Port" + port);
})
//create port end

//find 404 and hand over to error handler start
app.use((req, res, next)=>{
    next(createError(404));
});
//find 404 and hand over to error handler end

//error handler start
app.use((err,req,res, next)=>{
    console.error(err.message); // Log error message in server's console
    if(!err.statusCode) err.statusCode = 500;// If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message)// All HTTP requests must have a response, so let's send back an error with its status code and message
});
//error handler end
//setting port with express js end
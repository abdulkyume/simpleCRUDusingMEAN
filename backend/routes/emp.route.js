const express = require("express");
const app = express();
const emproute = express.Router();

let employee = require("../models/employee");

//add employee start
emproute.route('/create').post((req, res, next)=>{
    employee.create(req.body, (error,data)=>{
        if(error){
            return next(error);
        }
        else{
            res.json(data);
        }
    })
});
//add employee start

//get all employee start
emproute.route('/').get((req, res)=>{
    employee.find((error, data)=>{
        if(error)
        {
            return next(error);
        }
        else{
            res.json(data);
        }
    });
});
//get all employee end

//get one employee start
emproute.route('/read/:id').get((req, res)=>{
    employee.findById(req.params.id, (error, data)=>{
        if(error){
            return next(error);
        }
        else{
            res.json(data);
        }
    });
});
//get one employee end

//update employee start
emproute.route('/update/:id').put((req, res, next)=>{
    employee.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error,data)=>{
        if(error){
            console.log(error);
            return next(error);
        }
        else{
            res.json(data);
            console.log('Data updated successfully');
        }
    });
});
//update employee end

//delete employee start
emproute.route('/delete/:id').delete((req,res, next)=>{
    employee.findOneAndRemove(req.params.id, (error, data)=>{
        if(error){
            return next(error);
        }
        else{
            res.status(200).json({msg:data});
        }
    });
});
//delete employee end

module.exports = emproute;
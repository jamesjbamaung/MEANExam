const mongoose = require('mongoose');
require('../models/pet');
var Pet = mongoose.model('Pet');

module.exports = {
    index: function(req,res){
        Pet.find({}, function(err, pets){
            if(err){
                console.log("Error:", err);
            } else{
                res.json({message: "Here are all the tasks!", pets: pets})
            }
        }).sort({"type": 1})
    },

    details: function(req,res){
        Pet.findOne({_id:req.params.id}, function(err, pet){
            if(err){
                res.json({message: "Error", error:err});
            } else {
                res.json({message: "Success", pet:pet})
            }
        });
    },

    addPet: function(req,res){
        Pet.countDocuments({ name: req.body.name }, function (err, count) {
            if (err) {
                res.json({ message: "Error", error: err });
            }
            console.log(count);
            if (count == 0) {
                name = req.body.name

                var new_pet = new Pet({
                    name: name,
                    type: req.body.type,
                    description: req.body.description,
                    skillOne: req.body.skillOne,
                    skillTwo: req.body.skillTwo,
                    skillThree: req.body.skillThree
                });
                new_pet.save(function(err, pet){
                    if(err){
                        res.json({message: "Could not save new task", error:err})
                    } else{
                        res.json({message: 'succes!!!!!s', author: pet})
                        // res.redirect('/')
                    }
                });
            }
            else {
                console.log("user already exists")
                res.json({message: "non unique user", error: {message:'Name already exists'}} )
            }
        })
    },
    // addAuthor: function(req, res){
    //     Author.create({name: req.body.name}, function(err, author){
    //         if(err){
    //             res.json({message: "Error!", error: err});
    //         }
    //         else{
    //             res.json({message: "Success!", added: true});
    //         }
    //     })
    // },
    editPet: function(req,res){
        Pet.countDocuments({ name: req.body.name }, function (err, count) {
            if (err) {
                res.json({ message: "Error", error: err });
            }
            console.log(count);
            if (count == 0) {
                Pet.findOneAndUpdate({_id:req.params.id}, {$set: {
                    name:req.body.name,            
                    type: req.body.type,
                    description: req.body.description,
                    skillOne: req.body.skillOne,
                    skillTwo: req.body.skillTwo,
                    skillThree: req.body.skillThree}}, 
                    {runValidators: true},
                    function(err, pet){
                    if(err){
                        res.json({message:"Error", error:{message: "Name, Type, and Description must be 3 characters long"}});
                    } else{
                        res.json({message:"Success", data:pet});
                    }
                });
            }
            else {
                console.log("user already exists")
                res.json({message: "non unique user", error:{message:'Name already exists'}} )
            }
        })

    },

    deletePet: function(req,res) {
        console.log("id form authors.js")
        console.log(req.params.id)
        Pet.findOneAndDelete({_id:req.params.id}, function(err, pet){
            if(err){
                res.json({message: "error", error:err})
            } else{
                res.json({message: "removed task", data: pet});
            }
        })
    },
    addLike: function(req, res) {
        Pet.findOneAndUpdate({_id: req.params.id}, {$inc: {likes:1}}, {new: true }, function(err, response){
            if(err){
                res.json({message:"Error", error:{mesage: "Name, Type, and Description must be 3 characters long"}});
            } else{
                res.json({message:"Success", data:response});
            }
        })
    }
};
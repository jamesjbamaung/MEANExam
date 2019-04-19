const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String, 
        trim: true,
        required: [true, "Name is required!"],
        minlength: [3, "Name must be at least 3 characters!"]
    },
    type: {
        type: String,
        required: [true, "Type is required!"],
        minlength: [3, "Type must be at least 3 characters!"]
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
        minlength: [3, "Description must be at least 3 characters!"]
    },
    skillOne: {
        type: [String],
        default: ""
    },
    skillTwo: {
        type: [String],
        default: ""
    },
    skillThree: {
        type: [String],
        default: ""
    },
    likes: {
        type: Number,
        default: 0
    },
    
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        updated_at: Date.now,
    }
});

mongoose.model('Pet', petSchema);
var Pet = mongoose.model('Pet');
module.exports = Pet;
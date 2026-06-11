const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: 3
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        min: 10

    },
    message: {
        type: String,
        required: true,
        minLength: 5
    }
})


userSchema.index({name: 1});

// We need a collection to store the data
const UserMessage = mongoose.model('UserMessage', userSchema);
module.exports = UserMessage;
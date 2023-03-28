const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true // This is for created and update and in schema
});

const User = mongoose.model('User', userSchema);

module.exports = User;
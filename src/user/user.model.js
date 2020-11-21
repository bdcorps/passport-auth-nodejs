let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Basic User Schema for Google Authentication
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email required'],
        unique: [true, 'email already registered']
    },
    id: {
        type: String,
        default: null
    }
});

var userModel = mongoose.model("user", userSchema, "user");

module.exports = userModel;
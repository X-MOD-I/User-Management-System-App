const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Name: String,
    Address: String,
    Phone: Number
})

module.exports = mongoose.model('users', UserSchema)
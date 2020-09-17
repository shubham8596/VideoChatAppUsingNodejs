const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    firstname : String,
    lastname : String,
    email : String
});

module.exports = mongoose.model('users', UserSchema);

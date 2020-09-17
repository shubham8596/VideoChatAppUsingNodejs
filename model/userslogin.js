const mongoose = require('mongoose');

const UserLoginSchema = mongoose.Schema({
    roomid : String,
    email : String
});

module.exports = mongoose.model('userslogins',UserLoginSchema);

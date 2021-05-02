const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        name: String,
        password: String,
        salt: String,
        role: String,
    },
    { strict: false }
);
module.exports = mongoose.model('User', UserSchema);

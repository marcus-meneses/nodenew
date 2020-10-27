const mongoose = require('mongoose');
 

const userSchema = new mongoose.Schema({
name : {
    type: String,
    required : true
},
username : {
    type: String,
    required : true
},
password_hash : {
    type: String,
    required : true
},
clearance : {
    type: String,
    required: true,
    default: 'BASIC'
}
});


module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
 

const authSchema = new mongoose.Schema({
uid : {
    type: String,
    required : true
},
token : {
    type: String,
    required : true
},
clearance : {
    type: String,
    required : true
}
});


module.exports = mongoose.model('Credentials', authSchema);
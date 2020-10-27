const mongoose = require('mongoose');
const Entity = require("../classes/Entity");
const HistoryElement = require("../classes/HistoryElement");

const commonSchema = new mongoose.Schema({
name : {
    type: String,
    required : true
},
description : {
    type: String,
    required : true
},
enterDate: {
    type: Date,
    required : true,
    default: Date.now
},
history : {
    type : Array,
    required : false
}

});


module.exports = mongoose.model('Common', commonSchema);
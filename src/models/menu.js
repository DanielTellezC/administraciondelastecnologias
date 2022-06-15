const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const menu = new Schema({
    nombrecafe: String,
    tipograno: String,
    origen: String,
    temperatura: String,
    ingredientes: String,
    cuenta: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
});

module.exports = mongoose.model('menu', menu);
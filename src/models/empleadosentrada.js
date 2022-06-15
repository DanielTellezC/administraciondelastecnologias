const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const empleadoentrada = new Schema({
    fecha: { type: Date, default: Date.now },
    cuenta: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
    
});

module.exports = mongoose.model('empleadoentrada', empleadoentrada);
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const proveedor = new Schema({
    nombre: String,
    numero: String,
    direccion: String,
    descripcion: String,
    cuenta: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
    
});

module.exports = mongoose.model('proveedor', proveedor);
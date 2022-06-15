const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const rollos = new Schema({
    color: String,
    tipodetela: String,
    metros: String,
    img: String,
    fecha: { type: Date, default: Date.now },
    cuenta: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
    
});


module.exports = mongoose.model('rollos', rollos);

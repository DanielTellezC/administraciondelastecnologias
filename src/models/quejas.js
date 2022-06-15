const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const buzon = new Schema({
    comentario: String,
    cuenta: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
    
});

module.exports = mongoose.model('buzon', buzon);
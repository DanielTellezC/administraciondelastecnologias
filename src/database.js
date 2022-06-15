const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/inventario')
.then(db => console.log('Base de datos conectada: ',db.connection.host))
.catch(err => console.log(err));

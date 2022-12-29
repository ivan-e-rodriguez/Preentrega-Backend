const mongoose = require('mongoose')

const URL = 'mongodb+srv://usuario:pass@proyecto-backend.tlfr4hf.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw new Error ('Error de conexion a la base de datos ' + err)
    console.log("conectado correctamente");
})


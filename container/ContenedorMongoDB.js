const mongoose = require('mongoose')

class ContenedorProductosMongo {


    getByID(idProd){
        mongoose.models.productos.find({id: idProd})
    }

    getAll(){
        mongoose.models.productos.find()
    }

    deleteByID(idProd){
        mongoose.models.productos.deleteOne({id: idProd})
    }
    
}
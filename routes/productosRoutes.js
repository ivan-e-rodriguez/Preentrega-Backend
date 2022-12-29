const { Router } = require('express')
const Contenedor = require('../container/Contenedor')

const contenedor = new Contenedor('././productos.txt');
const routerProductos = new Router();

const admin = false;

routerProductos.get('/', (req, res) => {
    res.send(contenedor.getAll());
})

routerProductos.post('/', (req, res) => {
    if(admin){
        const producto = req.body
        res.json(contenedor.save(producto))

    }else{
        res.status(404).json({
            error: -1,
            descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
          });
    }
})

routerProductos.get('/:id', (req, res) => {
    const { id } = req.params
    res.json(contenedor.getByID(parseInt(id)))
})

routerProductos.put('/:id', (req, res) => {
    if(admin){
        const { id } = req.params
        const modifyProd = req.body
        res.json(contenedor.modifyById(parseInt(id), modifyProd))

    }else{
        res.status(404).json({
            error: -1,
            descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
          });
    }
})

routerProductos.delete('/:id', (req, res) => {
    if(admin){
        const { id } = req.params
        res.json(contenedor.deleteByID(parseInt(id)))

    }else{
        res.status(404).json({
            error: -1,
            descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
          });
    }
})

module.exports = routerProductos




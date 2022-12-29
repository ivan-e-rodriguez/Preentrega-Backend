const { Router } = require('express')
const Carrito = require('../container/Carrito')

const carrito = new Carrito('././carrito.txt');
const routerCarritos = new Router();

routerCarritos.post('/', (req, res) => {
    res.json(carrito.save())
})

routerCarritos.delete('/:id', (req, res) =>{
    const { id } = req.params
    res.json(carrito.deleteByID(parseInt(id)))
})

routerCarritos.get('/:id/productos', (req, res) => {
    const { id } = req.params
    res.json(carrito.getKartByID(parseInt(id)))
})

routerCarritos.post('/:id/productos/:id_prod', (req, res) => {
    const { id } = req.params
    const  { id_prod } = req.params

    res.json(carrito.postProduct(parseInt(id), parseInt(id_prod)))
})

routerCarritos.delete('/:id/productos/:id_prod', (req, res) => {
    const  { id } = req.params
    const  { id_prod } = req.params
    res.json(carrito.deleteProductByID(parseInt(id), parseInt(id_prod)))
})

module.exports = routerCarritos

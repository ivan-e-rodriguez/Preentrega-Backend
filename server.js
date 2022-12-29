const express = require('express')

const routerCarrito = require('./routes/carritoRoutes')
const routerProductos = require('./routes/productosRoutes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('/public'))

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

app.use((req, res) => {
    res.status(404).json({
      error: -2,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
    });
  });







const PORT = 8080

const server = app.listen(PORT, ()=>{
    console.log('Conectando al servidor');
})
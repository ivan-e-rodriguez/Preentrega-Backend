const fs = require('fs')

class Carrito {

    constructor(url) {
        this.url = url
    }

    save() {
        let data = this.getAll()
        let id = 0
        let arrKart
        if (data == "") {
            arrKart = []
        } else {
            arrKart = JSON.parse(data)
        }

        if (arrKart.length == 0) {
            id = 1
        } else {
            id = arrKart[arrKart.length - 1].id + 1
        }

        let newKart = { 
            id: id,
            timestamp: Date.now(),
            productos: [] 
        }

        arrKart.push(newKart)

        fs.writeFileSync(this.url, JSON.stringify(arrKart, null, 2))

        return newKart.id
    }

    getProductByID(idProd) {

        let data = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
        let found = data.some(prod => prod.id == idProd)
        if (found) {
            let product = data.find(prod => prod.id == idProd)
            return product
        } else {
            return ('Error query param no encontrado')
        }
    }

    getKartByID(idKart) {

        let data = JSON.parse(this.getAll())
        let found = data.some(kart => kart.id == idKart)
        if (found) {
            let carrito = data.find(kart => kart.id == idKart)
            return carrito
        } else {
            return ('Error query param no encontrado')
        }
    }

    postProduct(idKart, idProd){
        let carritos = JSON.parse(this.getAll())
        let carrito = carritos.find(carrito => carrito.id == parseInt(idKart))
        let producto = this.getProductByID(idProd)
        let index = carritos.indexOf(carrito)

        carrito.productos.push(producto)

        carritos[index] = carrito;
        fs.writeFileSync(this.url, JSON.stringify(carritos, null, 2))
    }

    getAll() {
        let data = fs.readFileSync(this.url, 'utf-8')
        return data
    }

    deleteByID(idKart) {

        let data = JSON.parse(fs.readFileSync(this.url, 'utf-8'))
        let found = data.some(kart => kart.id == idKart)
        if (found) {
            let kartDeleted = data.filter(prod => prod.id !== idKart)
            fs.writeFileSync(this.url, JSON.stringify(kartDeleted, null, 2))
            return kartDeleted
        } else {
            return ('Error query param no encontrado')
        }
    }

    deleteProductByID(idKart, idProd) {

        let carritos = JSON.parse(fs.readFileSync(this.url, 'utf-8'))
        let found = carritos.some(kart => kart.id == idKart)
        if (found) {
            let carrito = carritos.find(kart => kart.id == idKart)
            let producto = carrito.productos.filter(prod => prod.id !== idProd)
            if (producto !== undefined){
                carrito.productos = producto 
                let index = carritos.indexOf(carrito)
                carritos[index] = carrito;
                fs.writeFileSync(this.url, JSON.stringify(carritos, null, 2))          
            }
        } else {
            return ('Error query param no encontrado')
        }
    }

}

module.exports = Carrito;
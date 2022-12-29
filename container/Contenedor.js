const fs = require('fs')

class Contenedor {

    constructor(url) {
        this.url = url
    }

    save(producto) {
        let data = this.getAll()
        let id = 0
        let timestamp = Date.now();
        let arrProd
        if (data == "") {
            arrProd = []
        } else {
            arrProd = JSON.parse(data)
        }

        if (arrProd.length == 0) {
            id = 1
        } else {
            id = arrProd[arrProd.length - 1].id + 1
        }

        let newProd = { id: id, timestamp: timestamp, ...producto  }

        arrProd.push(newProd)

        fs.writeFileSync(this.url, JSON.stringify(arrProd, null, 2))

        return newProd
    }

    getByID(idProd) {
        let data = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
        let found = data.some(prod => prod.id == idProd)
        if (found) {
            let product = data.filter(prod => prod.id == idProd)
            return product
        } else {
            return ('Error query param no encontrado')
        }
    }

    getAll() {
        let data = fs.readFileSync(this.url, 'utf-8')
        return data
    }

    deleteByID(idProd) {

        let data = JSON.parse(fs.readFileSync(this.url, 'utf-8'))
        let found = data.some(prod => prod.id == idProd)
        if (found) {
            let product = data.filter(prod => prod.id == idProd)
            let prodDeleted = data.filter(prod => prod.id !== idProd)
            fs.writeFileSync(this.url, JSON.stringify(prodDeleted, null, 2))
            return ({ deletedProduct: product })
        } else {
            return ('Error query param no encontrado')
        }
    }

    deleteAll() {
        fs.writeFileSync(this.url, "")
        console.log("Todos los productos han sido eliminados.");
    }

    modifyById(id, modifyProd) {
        let data = JSON.parse(fs.readFileSync(this.url, 'utf-8'))
        let found = data.some(prod => prod.id == id)
        if (found) {
            let producto = this.getByID(id)
            let index = data.indexOf(producto)
            let oldProd = data[index]
            data[index] = { ...modifyProd, id: id }
            fs.writeFileSync(this.url, JSON.stringify(data, null, 2))
            return ({ oldProd: oldProd, newProd: modifyProd })
        } else {
            return ("Error query param no encontrado")
        }
    }

}

module.exports = Contenedor;
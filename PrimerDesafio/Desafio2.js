const fs = require("fs");

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "products.json";
    }

    addProduct(product) {
        this.getProducts();
        const { title, description, price, thumbnail, code, stock } = product;

        if(!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios")
            return;
        }

        if(this.products.some((p) => p.code === code)) {
            console.log("El codigo del producto ya existe")
            return;
        }

        const id = this.setId();
        this.products.push({ id, ...product });

        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            console.log("Datos guardados exitosamente");
        } catch (error) {
            console.error("Error al escribir el archivo");
        }
    }

    getProducts() {
        try {
            // if(fs.accessSync(this.path)) {
                const data = fs.readFileSync(this.path, "utf8");
                this.products = JSON.parse(data);
                console.log("Archivo leido exitosamente")
            // }
        } catch (error) {
            console.error("Error al leer el archivo", error);
        }
        return this.products;
    }

    getProductsById(id) {
        this.getProducts();
        const product = this.products.find((p) => p.id === id)
        if(product === undefined) {
            console.log(` El producto con el id ${id} no existe`)
        } else return product
    }

    setId() {
        this.lastId = this.getLastProductId()
        if(this.lastId === 0) this.lastId = 1;
        else this.lastId++;
        return this.lastId;
    }

    getLastProductId(){
        if(this.products.length === 0) return 0;
        const lastProductId = this.products[this.products.length - 1].id;
        console.log(`El ultimo id es: ${lastProductId}`);
        return lastProductId;
    }

    updateProduct(id, updatedProduct){
        this.getProducts();
        if(this.products.find((product) => product.id === id) === undefined) {
            console.error(`El id ${id} no existe`);
            return;
        }

        const indice = this.products.findIndex(product => product.id === id);
        this.products[indice] = { id, ...updatedProduct };

        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            console.log("Archivo actualizado");
        } catch (error) {
            console.error("No se pudo actualizar el archivo", error);
        }
    }


    deleteProduct(id){
        this.getProducts();

        if(this.products.find((product) => product.id === id) === undefined) {
            console.error(`El id ${id} no existe`);
            return;
        }

        const indice = this.products.findIndex(product => product.id === id);

        this.products.splice(indice, 1);

        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            console.log("Producto borrado exitosamente");
        } catch (error) {
            console.error("No se pudo borrar el producto", error);           
        }
    }

}

const productManager = new ProductManager();
// const product1 = {
//     title: 'Title',
//     description: 'Description',
//     price: 123,
//     thumbnail: 'No photo',
//     code: 'abc',
//     stock: 5
// } 

// const product2 = {
//     title: 'Title 2',
//     description: 'Description 2',
//     price: 456,
//     thumbnail: 'No photo',
//     code: 'zxc',
//     stock: 10
// } 


// productManager.addProduct(product1);
// productManager.addProduct(product2);
let misProductos = productManager.getProducts();
console.log(misProductos);

// const prod = productManager.getProductsById(1);
// console.log(prod);

// const product2 = {
//     title: 'New Title 2',
//     description: 'Description 2',
//     price: 456,
//     thumbnail: 'No photo',
//     code: 'zxc',
//     stock: 10
// } 

// productManager.updateProduct(2, product2);

// const product3 = {
//     title: 'Title 3',
//     description: 'Description 2',
//     price: 456,
//     thumbnail: 'No photo',
//     code: 'jkl',
//     stock: 10
// } 

// productManager.addProduct(product3);

productManager.deleteProduct(2);

misProductos = productManager.getProducts();
console.log(misProductos)
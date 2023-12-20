class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts(){
        console.log(this.products);
    }

    getProductsByID(id){
        if(!id){
            console.log("Ingresar ID para la busqueda");
            return;
        }

        const searcher = this.products.find((p) => p.id === id);

        if(searcher) {
            console.log(searcher);
        } else {
            console.log("Not found")
        }
    }

    addProducts(product) {
        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios");
        }

        if(this.products.some((p) => p.code === product.code)){
            console.error("El código ya exite");
            return;
        }

        const { title, description, price, thumbnail, code, stock } = product;

        const newProduct = {
            id: this.products.length + 1,
            title,
            description, 
            price,
            thumbnail,
            code,
            stock
        }
        
        this.products.push(newProduct);

    }
};


const productManager = new ProductManager();
productManager.getProducts();

const product1 = {
    title: "Product 1",
    description: "Test product",
    price: 100,
    thumbnail: "No image",
    code: 'asd123',
    stock: 10
};


//Prueba codigo

productManager.addProducts(product1);
productManager.getProducts();
productManager.addProducts(product1);
productManager.getProductsByID(1);
productManager.getProductsByID(9);
productManager.getProductsByID();

class ProductManager {
    constructor() {
        this.products = [];
    }
    static id = 0;
    addProduct(title, description, price, thumbnail, code, stock) {
        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].code === code) {
                console.log(`El codigo ${code} esta repetido`);
                break;
            }
        }

        if (!Object.values(newProduct).includes(undefined)) {
            ProductManager.id++;
            this.products.push({ ...newProduct, id: ProductManager.id });
        } else {
            console.log("Completar los campos faltantes");
        }
    }
    getProduct() {
        return this.products;
    }
    seachProduct(id) {
        return this.products.find((producto) => producto.id === id);
    }

    getProductById(id) {
        !this.seachProduct(id)
            ? console.log("Not Found")
            : console.log(this.seachProduct(id));
    }
}
const productos = new ProductManager();
//Primer llamada = arreglo vacio
console.log(productos.getProduct());
//Agregamos productos
productos.addProduct(
    "Producto1",
    "Este es el primer producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
);
productos.addProduct("Producto2", "descripcion2", 500, "Imagen2", "abc124", 10);

//Segunda llamada
console.log(productos.getProduct());

//Validacion de codigo repetido
productos.addProduct(
    "Producto3",
    "Producto de prueba para codigo",
    1000,
    "Imagen3",
    "abc124",
    7
);

//Validación de campos faltantes
productos.addProduct("Producto4", 500, "Imagen4", "abc126", 30);

//buscar productos por ID
productos.getProductById(2);

//Producto no encontrado
productos.getProductById(5);

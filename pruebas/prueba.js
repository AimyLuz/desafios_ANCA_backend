const fs = require('fs').promises;

// CLASE
class productManager {
	constructor(archivo) {
		this.path = archivo;
		
		this.products = [];
	}
	static id = 0;
	// METODO 1: Agrega un nuevo producto al array '#products' + un numero ID incrementable.
	addProduct = async (title, description, price, thumbnail, code, stock) => {
		// El bucle for, me permite saber si el atributo code de cada producto es repetido.
		for (let i = 0; i < this.products.length; i++) {
			if (this.products[i].code === code) {
				console.log(`Error, code ${code} esta repetido.`);
				break;
			}

			
		}

		const newProduct = {title, description, price, thumbnail, code, stock};

		// Comprueba que todos los campos sean obligatorios.
		if (!Object.values(newProduct).includes(undefined)) {
			productManager.id++; // Con cada producto nuevo, aumenta el ID en uno, de esta forma no se repiten.
			this.products.push({
        ...newProduct,
				id: productManager.id, 
			});
            await fs.writeFile(this.path, JSON.stringify(this.products))
        } else {
			console.log("Todos los campos son obligatorios.");
		}
        
	}

	// METODO 2: Devuelve el array completo del atributo '#products'.
	 getProducts = async() =>  {
    try{
        let colecciones = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(colecciones)
    } 
    catch (error) {
        await fs.writeFile(this.path, '[]');
        let colecciones = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(colecciones)
      }
		
	}

	// METODO 3: Busca productos dentro del array #products segun el numero ID.
	getProductById = async(id) => {
        let colecciones = await this.getProducts();
		if (!colecciones.find((i) => i.id === id)) {
			console.log("Not found.");
		} else {
			console.log(colecciones.find((i) => i.id === id));
		}
	}

    deleteProduct = async(id) => {
        let colecciones = await this.getProducts();
        
        let listaNueva = colecciones.filter((i) => i.id !== id)
        await fs.writeFile(this.path, JSON.stringify(listaNueva))
        
    }
}

// Se agregan productos.
const producto = new productManager('./listadoDeProductos.json');
producto.addProduct("error1", "descripcion", 20000, "img"); // Producto erroneo por falta de campos.
producto.addProduct("error2", "descripcion", 20000, "img"); // Producto erroneo por falta de campos.
producto.addProduct("Monitor", "descripcion 1", 10000, "img 1", "AA01", 10); // Producto 1
producto.addProduct("Teclado", "descripcion 2", 5000, "img 2", "AA02", 8); // Producto 2
producto.addProduct("percha", "descripcion 4", 500, "img 4", "AA04", 5)// Producto 3
producto.addProduct("lala", "descridspcion 4", 5300, "img 5", "AA05", 7)


producto.deleteProduct(1); // borra un producto

//console.log(producto.getProducts());
/*
producto.getProductById(5); // Devuelve si existe o no el producto con el ID buscado.
producto.getProductById(2);
producto.getProductById(8);
producto.getProductById(1);*/
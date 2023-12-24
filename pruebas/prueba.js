const fs = require("fs").promises;

// CLASE
class productManager {
  constructor(archivo) {
    this.path = archivo;

    this.products = [];
  }
  static id = 0;
  // METODO 1: Agrega un nuevo producto al array '#products' + un numero ID incrementable.
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    // ver codigo repetido
    let colecciones = await this.getProducts();
    let codeRep = colecciones.some((i) => i.code === code);
    if (codeRep) {
      console.log(`Error, code ${code} esta repetido.`);
    } else {
      const newProduct = { title, description, price, thumbnail, code, stock };
      // Comprueba que todos los campos sean obligatorios.
      if (!Object.values(newProduct).includes(undefined)) {
        productManager.id++; // Con cada producto nuevo, aumenta el ID en uno, de esta forma no se repiten.
        this.products.push({
          ...newProduct,
          id: productManager.id,
        });
        await fs.writeFile(this.path, JSON.stringify(this.products));
      } else {
        console.log("Todos los campos son obligatorios.");
      }
    }
  };

  // METODO 2: Devuelve el array completo del atributo '#products'.
  getProducts = async () => {
    try {
      let colecciones = await fs.readFile(this.path, "utf-8");
      return JSON.parse(colecciones);
    } catch (error) {
      await fs.writeFile(this.path, "[]");
      let colecciones = await fs.readFile(this.path, "utf-8");
      return JSON.parse(colecciones);
    }
  };

  // METODO 3: Busca productos dentro del array #products segun el numero ID.
  getProductById = async (id) => {
    let colecciones = await this.getProducts();
    if (!colecciones.find((i) => i.id === id)) {
      console.log("Not found.");
    } else {
      console.log(colecciones.find((i) => i.id === id));
    }
  };

  deleteProduct = async (id) => {
    let colecciones = await this.getProducts();

    let listaNueva = colecciones.filter((i) => i.id !== id);
    await fs.writeFile(this.path, JSON.stringify(listaNueva));
  };

  updateProduct = async (id, campo, valor) => {
    let colecciones = await this.getProducts();
    let productoIndex = colecciones.findIndex((i) => i.id === id);

    if (productoIndex !== -1) {
        colecciones[productoIndex][campo] = valor;
        await fs.writeFile(this.path, JSON.stringify(colecciones));
    } else {
        console.log(`Not found id: ${id}`);
    }
    
    
  };

  test = async () => {
    //Primer llamada = arreglo vacio
console.log(await producto.getProducts());
    //Agregamos productos
    await producto.addProduct(
      "Producto1",
      "Este es el primer producto prueba",
      200,
      "Sin imagen",
      "abc123",
      25
    ); // Producto 1
    await producto.addProduct(
      "Producto2",
      "descripcion2",
      500,
      "Imagen2",
      "abc124",
      10
    ); // Producto 2
    //Validacion de codigo repetido
    await producto.addProduct(
      "Codigo repetido",
      "Producto de prueba para codigo",
      1000,
      "Imagen3",
      "abc124",
      7
    ); 
    //Validación de campos faltantes
    await producto.addProduct(
      "Campos Incompletos",
      500,
      "Imagen",
      "abc126",
      30
    ); 
    //más productos
    await producto.addProduct(
      "3",
      "descripcion 4",
      10000,
      "img 4",
      "AA04",
      10
    ); // Producto 3
    await producto.addProduct(
      "4",
      "descripcion 5",
      5000,
      "img 5",
      "AA05",
      8
    ); // Producto 4
    await producto.addProduct(
      "5",
      "descripcion 6",
      500,
      "img 6",
      "AA06",
      5
    ); // Producto 5
    await producto.addProduct(
      "6",
      "descridspcion 7",
      5300,
      "img 7",
      "AA07",
      7
    ); //producto 6

    //update

    await producto.deleteProduct(1);
    await producto.deleteProduct(4);

    await producto.updateProduct(6, "title", "Gonzalo")

    //Segunda llamada
 console.log(await producto.getProducts());



//buscar productos por ID
await producto.getProductById(2);
await producto.getProductById(3);
await producto.getProductById(5);
await producto.getProductById(4);

//Producto no encontrado
await producto.getProductById(15);

  };
}

// Se agregan productos.
const producto = new productManager("./listadoDeProductos.json");


producto.test();

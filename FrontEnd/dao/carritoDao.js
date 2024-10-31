export default class CarritoDAo {
    constructor() {

    }
    // Función para obtener el carrito desde la base de datos y devolverlo en formato JSON
    obtenerCarrito() {
        let carrito = JSON.parse(localStorage.getItem("carrito"));
        if (carrito == null) {
            carrito = [];
        }
        return carrito;

    }

    // Función para confirmar una compra


    // Función para eliminar un producto del carrito
    eliminarProductoCarrito(idProducto , talle) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.filter(producto => producto.productId != idProducto && producto.talle != talle);
        this.guardarCarrito(nuevoCarrito);
        
    }



    guardarCarrito(carrito) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Función para modificar el stock de un producto en el carrito
    modificarStockCarrito(quantity, idProducto) {

        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.map(producto => {
            if (producto.productId == idProducto) {
                producto.quantity = quantity;
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);

       
    }

    aumentarCantidadCarrito(idProducto,talle) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.map(producto => {
            if (producto.productId == idProducto && producto.talle == talle) {
                producto.quantity++;
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);
    }

    disminuirCantidadCarrito(idProducto , talle) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.map(producto => {
            if (producto.productId == idProducto && producto.talle == talle && producto.quantity > 1) {
                producto.quantity--;
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);
    }

    // Función para agregar un producto al carrito
    agregarProductoCarrito(product) {
        let carrito = this.obtenerCarrito();
        let productoExistente = carrito.find(producto => producto.productId == product.productId && producto.talle == product.talle);
        if (productoExistente == null) {
            carrito.push(product);
            this.guardarCarrito(carrito);
            
        }else{
            this.eliminarProductoCarrito(product.productId,product.talle);
            productoExistente.quantity += product.quantity;
            let carritoSinExistente = this.obtenerCarrito();
            carritoSinExistente.push(productoExistente);
            this.guardarCarrito(carritoSinExistente);

        }
       
       

        /*    [
                    {
                        productId: 1,
                        quantity: 2,
                        name: "Remera",
                        talle: "M",
                        price: 2000
                        offert
                    },
                   {
                        productId: 2,
                        quantity: 5,
                        talle: "M",
                        price: 2000
                        idOffer: null
                    },
                ]
         */

    }

    async confirmarCompra(direccion, metodoEnvio, metodoPago) {
        if(metodoEnvio == "Retiro en el local"){
            direccion = null;
        }
        let products = this.obtenerCarrito();
        let venta = {
            direccion: direccion,
            metodoEnvio: metodoEnvio,
            metodoPago: metodoPago,
            fechaVenta: new Date().toLocaleString(),
            products: products
        }

        let formData = new FormData();
        formData.append("direccion", direccion);
        formData.append("metodoEnvio", metodoEnvio);
        formData.append("metodoPago", metodoPago);
        formData.append("fechaVenta", new Date().toLocaleString());
        formData.append("products", JSON.stringify(products));
        let config = {
            method: "POST",
            body: formData
        }
        console.log(products);
       // let response = await fetch("http://localhost:3000/ventas", config);
       // let data = await response.json();
     //   return data;

    }
}
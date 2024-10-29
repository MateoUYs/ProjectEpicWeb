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
    eliminarProductoCarrito(idProducto) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.filter(producto => producto.productId != idProducto);
        this.guardarCarrito(nuevoCarrito);
        // Implementación pendiente
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

        // Implementación pendiente
    }

    // Función para agregar un producto al carrito
    agregarProductoCarrito(product) {
        let carrito = this.obtenerCarrito();
        carrito.push(product);
        this.guardarCarrito(carrito);

        /*    [
                    {
                        productId: 1,
                        quantity: 2,
                        talle: "M",
                        price: 2000
                        idOffer: 1
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

    confirmarCompra(direccion, metodoEnvio, metodoPago, fechaVenta) {
        let products = this.obtenerCarrito();
        let venta = {
            direccion: direccion,
            metodoEnvio: metodoEnvio,
            metodoPago: metodoPago,
            fechaVenta: fechaVenta,
            products: products
        }

    }
}
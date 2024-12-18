import Origin from '../config/origin.js';

export default class CarritoDAO {
    constructor() {

    }

    obtenerCarrito() {
        let carrito = JSON.parse(localStorage.getItem("carrito"));
        if (carrito == null) {
            carrito = [];
        }
        return carrito;

    }

    eliminarProductoCarrito(idProducto , talle) {
        let carrito = this.obtenerCarrito();
        console.log(carrito);     
        let nuevoCarrito = carrito.filter(producto => !(producto.productId == idProducto && producto.size == talle));
        console.log(nuevoCarrito);
        console.log(idProducto);

        console.log(talle);
        this.guardarCarrito(nuevoCarrito);
        
    }

    guardarCarrito(carrito) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }


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
            if (producto.productId == idProducto && producto.size == talle) {
                producto.quantity++;
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);
    }

    disminuirCantidadCarrito(idProducto , talle) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.map(producto => {
            if (producto.productId == idProducto && producto.size == talle && producto.quantity > 1) {
                producto.quantity--;
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);
    }


    agregarProductoCarrito(product) {
        let carrito = this.obtenerCarrito();
        console.log(product)
        let productoExistente = carrito.find(producto => producto.productId == product.productId && producto.size == product.size);
        if (productoExistente == null) {
            carrito.push(product);
            this.guardarCarrito(carrito);
            
        }else{
            this.eliminarProductoCarrito(product.productId,product.size);
            productoExistente.quantity += product.quantity;
            let carritoSinExistente = this.obtenerCarrito();
            carritoSinExistente.push(productoExistente);
            this.guardarCarrito(carritoSinExistente);

        }

    }

    async confirmarCompra(direccion, metodoEnvio, metodoPago) {
        if(metodoEnvio == "Retiro"){
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

        let url = Origin + "/BackEnd/controller/saleController.php?function=add";
        let formData = new FormData();
        formData.append("shippingAddress", direccion);
        formData.append("shippingMethod", metodoEnvio);
        formData.append("paymentMethod", metodoPago);
        formData.append("saleDate", new Date().toISOString().slice(0, 19).replace('T', ' '));
        formData.append("products", JSON.stringify(products));
        let config = {
            method: "POST",
            body: formData
        }
       let response = await fetch(url, config);

       let data = await response.json();
       if(data.status){
        localStorage.setItem("carrito", JSON.stringify([]));

       }
       return data;
    }
}
export default class ProductoDao {
    async getProducts() {
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/productController.php?function=obtener";
        let respuestaConsulta = await fetch(url);
        let respuesta = await respuestaConsulta.json();

    }

    // Función para agregar un producto
    async addProducts() {

        // Implementación pendiente
    }

    // Función para eliminar un producto
    async deleteProducts() {

        // Implementación pendiente
    }

    // Función para modificar un producto
    async modifyProducts() {

        // Implementación pendiente
    }

    // Función para obtener detalles de un producto específico
    async obtenerDetalleProducto() {

        // Implementación pendiente
    }
}
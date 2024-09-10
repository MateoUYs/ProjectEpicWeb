export default class ProductoDao {
    async getProducts() {
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/productController.php?function=getProducts";
        let queryResponse = await fetch(url);
        let query = await queryResponse.json();
        return query;
    }

    async addProducts(precio, descripcion, imagen, nombre, color) {
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/productController.php?function=addProduct";
        let formData = new FormData();
        formData.append("precio",precio);
        formData.append("descripcion",descripcion);
        formData.append("imagen",imagen);
        formData.append("nombre",nombre);
        formData.append("color",color);

        let config = {
            method:"POST",
            body: formData
        }
        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;
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
    async getProductDetails() {

        // Implementación pendiente
    }
}
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
    async deleteProduct(idProducto) {
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/productController.php?function=deleteProduct";
        let formData = new FormData();
        formData.append("id",idProducto);
       
        let config = {
            method:"POST",
            body: formData
        }
        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;
    }

    // Función para modificar un producto
    async modifyProduct(idProducto, precio, descripcion, imagen, nombre, color) {
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/productController.php?function=modifyProduct";
        let formData = new FormData();
        formData.append("id",idProducto);
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

    // Función para obtener detalles de un producto específico
    async getProductDetails(idProducto) {
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/productController.php?function=getProductDetails";
        let formData = new FormData();
        formData.append("id",idProducto);
       
        let config = {
            method:"POST",
            body: formData
        }
        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;
        
    }

    async getStock() {
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/productController.php?function=getStock";
        let queryResponse = await fetch(url);
        let query  = await queryResponse.json();
        return query;
    }
}
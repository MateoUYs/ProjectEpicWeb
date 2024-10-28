import origin from './origin.js';


export default class ProductoDao {
    async getProducts() {
        let url = origin + "/BackEnd/controller/productController.php?function=getProducts";
        let queryResponse = await fetch(url);
        let query = await queryResponse.json();
        return query;
    }

    async addProducts(price, description, image, name, color, sizes) {
        console.log(sizes);
        let url = origin + "/BackEnd/controller/productController.php?function=addProduct";
        let formData = new FormData();
        formData.append("price",price);
        formData.append("description",description);
        formData.append("image",image);
        formData.append("name",name);
        formData.append("color",color);
        sizes.forEach(size => {
            formData.append("size[]", size);
        });

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
        let url = origin + "/BackEnd/controller/productController.php?function=deleteProduct";
        let formData = new FormData();
        formData.append("productId",idProducto);
       
        let config = {
            method:"POST",
            body: formData
        }
        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;
    }

    // Función para modificar un producto
    async modifyProduct(productId, price, description, image, name, color, sizes, oldSizes) {
        let url = origin + "/BackEnd/controller/productController.php?function=modifyProduct";
        let formData = new FormData();
        formData.append("productId",productId);
        formData.append("price",price);
        formData.append("description",description);
        formData.append("image",image);
        formData.append("name",name);
        formData.append("color",color);
        sizes.forEach(size => {
            formData.append("size[]", size);
        });
        if (oldSizes) {
            oldSizes.forEach(oldSize => {
                formData.append("oldSizes[]", oldSize);
            });
        } else {
            formData.append("oldSizes", "");
        }

        let config = {
            method:"POST",
            body: formData
        }
        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;
    }

    // Función para obtener detalles de un producto específico
    async getProductDetails(productId) {
        let url = origin + "/BackEnd/controller/productController.php?function=getProductDetails";
        let formData = new FormData();
        formData.append("productId",productId);
       
        let config = {
            method:"POST",
            body: formData
        }
        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;
        
    }

    async getStock() {
        let url = origin + "/BackEnd/controller/productController.php?function=getStock";
        let queryResponse = await fetch(url);
        let query  = await queryResponse.json();
        return query;
    }

    async addStock(productId, stock){
        let url = origin + "/BackEnd/controller/productController.php?function=addStock";
        let formData = new FormData();
        formData.append("productId",productId);
        formData.append("stock",stock);

        let config = {
            method:"POST",
            body: formData
        }

        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;
    }

    async updateStock(productId, stock){
        let url = origin + "/BackEnd/controller/productController.php?function=updateStock";
        let formData = new FormData();
        formData.append("productId",productId);
        formData.append("stock",stock);

        let config = {
            method:"POST",
            body: formData
        }

        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;
    }

    async getProductSize(productId){
        let url = origin + "/BackEnd/controller/productController.php?function=getProductSize";
        let formData = new FormData();
        formData.append("productId",productId);
       
        let config = {
            method:"POST",
            body: formData
        }
        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;
    }
}
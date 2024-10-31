import origin  from "../config/origin";

export default class SaleDAO {
    async getSales() {
        let url = origin + "/BackEnd/controller/saleController.php?function=getAll";
        let queryResponse = await fetch(url);
        let query = await queryResponse.json();
        return query;
    }

    async addSale(shippingAddress, paymentMethod, shippingMethod, saleDate, products) {
        let url = origin + "/BackEnd/controller/saleController.php?function=add";
        let formData = new FormData();
        formData.append("shippingAddress", shippingAddress);
        formData.append("paymentMethod", paymentMethod);
        formData.append("shippingMethod", shippingMethod);
        formData.append("saleDate", saleDate);
        formData.append("products", products);
        let config = {
            method: "POST",
            body: formData
        }

        let queryResponse = await fetch(url, config);
        let query = await queryResponse.json();
        return query;

    }

    async getUserSales() {
        let url = origin + "/BackEnd/controller/saleController.php?function=getUserSales";
        let queryResponse = await fetch(url);
        let query = await queryResponse.json();
        return query;
    }

    async getLastSales() {
        let url = origin 
    }

   

}
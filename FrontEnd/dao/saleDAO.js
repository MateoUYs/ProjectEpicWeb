import origin  from "../config/origin.js";

export default class SaleDAO {
    async getAll() {
        let url = origin + "/BackEnd/controller/saleController.php?function=getAll";
        let queryResponse = await fetch(url);
        let query = await queryResponse.json();
        return query;
    }

    async add(shippingAddress, paymentMethod, shippingMethod, saleDate, products) {
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
        let url = origin + "/BackEnd/controller/saleController.php?function=getLastSales";
        let queryResponse = await fetch(url);
        let query = await queryResponse.json();
        return query;
    }

   async updateSale(saleId, isPaid, shippingAddress, saleStatus ,paymentMethod, shippingMethod, saleDate, trackingNumber, userCi){
    let url = origin + "/BackEnd/controller/saleController.php?function=updateSale";
    let formData = new FormData();
    formData.append("saleId", saleId);
    formData.append("isPaid", isPaid);
    formData.append("shippingAddress", shippingAddress);
    formData.append("saleStatus", saleStatus);
    formData.append("paymentMethod", paymentMethod);
    formData.append("shippingMethod", shippingMethod);
    formData.append("saleDate", saleDate);
    formData.append("trackingNumber", trackingNumber);
    formData.append("userCi", userCi);
    
    let config = {
        method: "POST",
        body: formData
    }

    let queryResponse = await fetch(url, config);
    let query = await queryResponse.json();
    
    return query;
   }

}
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

   async updateStatus(saleId, saleStatus){
    let url = origin + "/BackEnd/controller/saleController.php?function=updateStatus";
    let formData = new FormData();
    formData.append("saleId", saleId);
    formData.append("saleStatus", saleStatus);
    let config = {
        method: "POST",
        body: formData
    }

    let queryResponse = await fetch(url, config);
    let query = await queryResponse.json();
    return query;
   }

   async addTrackingNumber(saleId, trackingNumber){
    let url = origin + "/BackEnd/controller/saleController.php?function=addTrackingNumber";
    let formData = new FormData();
    formData.append("saleId", saleId);
    formData.append("trackingNumber", trackingNumber);
    let config = {
        method: "POST",
        body: formData
    }

    let queryResponse = await fetch(url, config);
    let query = await queryResponse.json();
    return query;
   }


}
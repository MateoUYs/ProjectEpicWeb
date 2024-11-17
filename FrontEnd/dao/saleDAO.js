import origin from "../config/origin.js";

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
        let formData = new FormData();
        let actualDate = new Date();
        let yesterdayDate = new Date(actualDate.getTime() - 24 * 60 * 60 * 1000);
        let year = yesterdayDate.getFullYear();
        let month = String(yesterdayDate.getMonth() + 1).padStart(2, '0');
        let day = String(yesterdayDate.getDate()).padStart(2, '0');
        let hours = String(yesterdayDate.getHours()).padStart(2, '0');
        let minutes = String(yesterdayDate.getMinutes()).padStart(2, '0');
        let seconds = String(yesterdayDate.getSeconds()).padStart(2, '0');
        
        let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        formData.append("yesterdayDate", formattedDate);
        let config = {
            method: "POST",
            body: formData
        }


        let queryResponse = await fetch(url, config);
        let query = await queryResponse.json();
        return query;
    }

    async updateSale(saleId, isPaid, shippingAddress, saleStatus, paymentMethod, shippingMethod, saleDate, trackingNumber, userCi) {
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
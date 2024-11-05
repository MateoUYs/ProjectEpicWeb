import origin from "../config/origin.js";

export default class OfferDAO {

    async getOffers() {
        let url = origin + "/BackEnd/controller/offerController.php?function=get";
        let queryResponse = await fetch(url);
        let query = await queryResponse.json();
        return query;
    }

    async addOffer(title, description, endDate, startDate, discount, products) {
        let url = origin + "/BackEnd/controller/offerController.php?function=add";
        let formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("endDate", endDate);
        formData.append("startDate", startDate);
        formData.append("discount", discount);
        formData.append("products", products);
        console.log(products);
        let config = {
            method: "POST",
            body: formData
        }

        let queryResponse = await fetch(url, config);
        let query = await queryResponse.text();
        console.log(query);
        return query;

    }

   async deleteOffer(offerId) {
        let url = origin + "/BackEnd/controller/offerController.php?function=delete";
        let formData = new FormData();
        formData.append("offerId", offerId);
        let config = {
            method: "POST",
            body: formData
        }
        let queryResponse = await fetch(url, config);
        let query = await queryResponse.json();
        return query;
    }

    async modifyOffer(offerId, title, description, endDate, startDate, discount, products) {
        let url = origin + "/BackEnd/controller/offerController.php?function=modify";
        let formData = new FormData();
        formData.append("offerId", offerId);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("endDate", endDate);
        formData.append("startDate", startDate);
        formData.append("discount", discount);
        formData.append("products", products);
        let config = {
            method: "POST",
            body: formData
        }

        let queryResponse = await fetch(url, config);
        let query = await queryResponse.json();
        return query;
    }

}
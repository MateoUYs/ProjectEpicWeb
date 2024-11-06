import origin from '../config/origin.js';

export default class statsDAO{
    async getBestSellings() {
        let url = origin + "/BackEnd/controller/statsController.php?function=getBestSellings";
        let queryResponse = await fetch(url);
        let query = await queryResponse.json();
        return query;
    }

    async getLeastSold() {
        let url = origin + "/BackEnd/controller/statsController.php?function=getLeastSold";
        let queryResponse = await fetch(url);
        let query = await queryResponse.json();
        return query;
    }

    async getMostSaved() {
        let url = origin + "/BackEnd/controller/statsController.php?function=getMostSaved";
        let queryResponse = await fetch(url);
        let query = await queryResponse.json();
        return query;
    }
}
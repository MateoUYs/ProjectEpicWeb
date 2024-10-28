import origin from './origin.js'

export default class SizeDAO{
    async getSizes(){
        let url = origin + "/BackEnd/controller/sizeController.php?function=getSize";
        let queryResponse = await fetch(url);
        let query = await queryResponse.json();
        return query;
    }

    async addSize(size){
        let url = origin + "/BackEnd/controller/sizeController.php?function=addSize";
        let formData = new FormData();
        formData.append("size", size);

        let config = {
            method:"POST",
            body: formData
        }

        let queryResponse = await fetch(url, config);
        let query = await queryResponse.json();
        return query;
    }

    async deleteSize(size){
        let url = origin + "/BackEnd/controller/sizeController.php?function=deleteSize";
        let formData = new FormData();
        formData.append("size", size);

        let config = {
            method:"POST",
            body: formData
        }

        let queryResponse = await fetch(url, config);
        let query = await queryResponse.json();
        return query;
    }
}
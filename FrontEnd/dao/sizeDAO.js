export default class SizeDAO{
    async getSizes(){
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/sizeController.php?function=getSize";
        let queryResponse = await fetch(url);
        let query = await queryResponse.json();
        return query;
    }
}
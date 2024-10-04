export default class UserDAO{

    async addUser(ci, email, username, password, phoneNumber){
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/userController.php?function=addUser";
        let formData = new FormData();
        formData.append("ci",ci);
        formData.append("usuario",username);
        formData.append("password",password);
        formData.append("email",email);
        formData.append("phone",phoneNumber);
        let config = {
            method:"POST",
            body: formData
        }

        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;
    
    }

    async getUsers(){
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/userController.php?function=getUsers";
        let queryResponse = await fetch(url);
        let query  = await queryResponse.json();
        return query;
    }

    async modifyUser(ci, email, username, password, phoneNumber){
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/userController.php?function=modifyUser";
        let formData = new FormData();
        formData.append("ci", ci);
        formData.append("usuario", username);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("phone", phoneNumber);

        let config = {
            method:"POST",
            body: formData
        }

        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;
    }

    async deleteUser(ci){
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/userController.php?function=deleteUser";
        let formData = new FormData();
        formData.append("ci",ci);
        let config = {
            method:"POST",
            body: formData
        }
        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;
    }

    async verifyUser(email, verifyCode){
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/userController.php?function=verifyUser";
        let formData = new FormData();
        formData.append("email",email);
        formData.append("code",verifyCode);
        let config = {
            method:"POST",
            body: formData
        }
        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.text();
        console.log(query);
        return query;
    }
}
import origin from "../config/origin.js";

export default class UserDAO{

    async addUser(ci, email, username, password, phoneNumber){
        let url = origin + "/BackEnd/controller/userController.php?function=add";
        let formData = new FormData();
        formData.append("ci",ci);
        formData.append("userName",username);
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
        let url = origin + "/BackEnd/controller/userController.php?function=get";
        let queryResponse = await fetch(url);
        let query  = await queryResponse.json();
        return query;
    }

    async modifyUser(ci, email, username, password, phoneNumber){
        let url = origin + "/BackEnd/controller/userController.php?function=modify";
        let formData = new FormData();
        formData.append("userName", username);
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
        let url = origin + "/BackEnd/controller/userController.php?function=delete";
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
        let url = origin + "/BackEnd/controller/userController.php?function=verify";
        let formData = new FormData();
        formData.append("email",email);
        formData.append("code",verifyCode);
        let config = {
            method:"POST",
            body: formData
        }
        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;
    }
}
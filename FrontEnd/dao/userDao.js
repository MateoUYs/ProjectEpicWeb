export default class UserDAO{

    async addUser(ci,correo,usuario,password,telefono){
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/userController.php?function=addUser";
        let formData = new FormData();
        formData.append("ci",ci);
        formData.append("usuario",usuario);
        formData.append("password",password);
        formData.append("email",correo);
        formData.append("phone",telefono);
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

    async modifyUser(ci, ){
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/userController.php?function=modifyUser";
        let formData = new FormData();
        formData.append("ci", ci);
        formData.append("usuario", usuario);
        zformData.append("password", password);
        formData.append("email", correo);
        
        
        formData.append("phone", telefono);
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
        let query  = await queryResponse.json();
        return query;
    }
}
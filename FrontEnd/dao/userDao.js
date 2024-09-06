export default class UserDAO{

    //registrar User

    async registrarUsuario(ci,correo,usuario,password,telefono){
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/userController.php?function=addUser";
        let formData = new FormData();
        formData.append("ci",ci);
        formData.append("correo",correo);
        formData.append("usuario",usuario);
        formData.append("password",password);
        formData.append("telefono",telefono);
        let config = {
            method:"POST",
            body:formData
        }


        let respuestaConsulta = await fetch(url,config);
        let respuesta  = await respuestaConsulta.json();
        return respuesta;
    
    }
}
import origin from './origin.js'

export default class SessionDAO{


    async logIn(email,password) {
        let url = origin + "/BackEnd/controller/sesionController.php?function=logIn";
        let formData = new FormData();
        formData.append("email",email);
        formData.append("password",password);
        let config = {
            method:"POST",
            body:formData
        }

        let queryResponse = await fetch(url,config);
        let query  = await queryResponse.json();
        return query;
    }

    async getSession() {
        let url = origin + "/BackEnd/controller/sesionController.php?function=getSession";
        let queryResponse = await fetch(url);
        let query  = await queryResponse.json();
    
        return query;

    }

    async logOut() {
        let url = origin + "/BackEnd/controller/sesionController.php?function=logOut";
        let respuestaConsulta = await fetch(url);
        let respuesta  = await respuestaConsulta.json();
        return respuesta;
    }
}

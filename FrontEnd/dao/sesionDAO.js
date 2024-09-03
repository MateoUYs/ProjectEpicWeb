export default class SesionDAO{


    async iniciarSesion(email,password) {
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/sesionController.php?function=iniciarSesion";
        let formData = new FormData();
        formData.append("email",email);
        formData.append("password",password);
        let config = {
            method:"POST",
            body:formData
        }

        let respuestaConsulta = await fetch(url,config);
        let respuesta  = await respuestaConsulta.json();

        
    }
    
    async obtenerSesion() {
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/sesionController.php?function=obtenerSesion";
        let respuestaConsulta = await fetch(url);
        let respuesta  = await respuestaConsulta.json();

    }
    
    async cerrarSesion() {
        let url = "http://localhost/ProjectEpicWeb/BackEnd/controller/sesionController.php?function=cerrarSesion";
        let respuestaConsulta = await fetch(url);
        let respuesta  = await respuestaConsulta.json();
    }
}
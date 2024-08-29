export default class Usuario{
    ci;
    username;
    password;
    telefono;
    isverificada;
    email;
    is_sdmin;

    constructor(ci,username,password,telefono,isverificada,color,stock,id){
        this.ci=ci;
        this.username=username;
        this.password=password;
        this.telefono=telefono;
        this.isverificada=isverificada;
        this.email=email;
        this.is_sdmin=is_sdmin;
    }

}
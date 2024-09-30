import SessionDAO from "../../../dao/sessionDAO.js"

window.onload = ()=>{
 let logout = document.querySelector("#logout");
 console.log(logout);
 logout.onclick = ()=>{
    cerrarSesion();
 }
}

async function cerrarSesion(){
    console.log(",fdcaevfd");
    let request = await new SessionDAO().logOut();
    console.log(request);
    
}


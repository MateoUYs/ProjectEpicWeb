window.onload = () => {
    agregarEventoMenu();
};

function agregarEventoMenu() {
    const menuBoton = document.querySelector("#menu");
    const panelElemento = document.querySelector("#panelMenu");

    menuBoton.onclick = () => {
        console.log(panelElemento.classList);
        

        if (panelElemento.classList.contains("panelMenuDesactivado")) {
            panelElemento.classList.remove("panelMenuDesactivado");
            panelElemento.classList.add("panelMenuActivado");
        } else {
            panelElemento.classList.add("panelMenuDesactivado");
            panelElemento.classList.remove("panelMenuActivado");
        }
    };
}

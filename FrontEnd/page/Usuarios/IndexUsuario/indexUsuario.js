let menuAbierto = false;
let cartAbierto = false;

window.onload = () => {
    agregarEventoMenu();
    agregarEventoCart();
};

function agregarEventoMenu() {
    const menuBoton = document.querySelector("#menu");
    const panelElemento = document.querySelector("#panelMenu");

    menuBoton.onclick = () => {
        if (cartAbierto) { 
            cerrarCarrito();
        }

        if (menuAbierto) {
            cerrarMenu();
        } else {
            abrirMenu();
        }
    };
}

function agregarEventoCart() {
    const cartBoton = document.querySelector("#cart");
    const panelElemento = document.querySelector("#panelCart");

    cartBoton.onclick = () => {
        if (menuAbierto) { 
            cerrarMenu();
        }

        if (cartAbierto) {
            cerrarCarrito();
        } else {
            abrirCarrito();
        }
    };
}

function abrirMenu() {
    const panelElemento = document.querySelector("#panelMenu");
    panelElemento.classList.remove("panelMenuDesactivado");
    panelElemento.classList.add("panelMenuActivado");
    menuAbierto = true;
}

function cerrarMenu() {
    const panelElemento = document.querySelector("#panelMenu");
    panelElemento.classList.add("panelMenuDesactivado");
    panelElemento.classList.remove("panelMenuActivado");
    menuAbierto = false;
}

function abrirCarrito() {
    const panelElemento = document.querySelector("#panelCart");
    panelElemento.classList.remove("panelCartDesactivado");
    panelElemento.classList.add("panelCartActivado");
    cartAbierto = true;
}

function cerrarCarrito() {
    const panelElemento = document.querySelector("#panelCart");
    panelElemento.classList.add("panelCartDesactivado");
    panelElemento.classList.remove("panelCartActivado");
    cartAbierto = false;
}

import ProductDAO from "../../../dao/productDao.js";
let menuAbierto = false;
let cartAbierto = false;

window.onload  = async () => {
    showProduct();
    addEvents();
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

function addEvents() {
    let imgButtons = document.querySelectorAll("#productContainer img");

    imgButtons.forEach(imgBtn => {
        imgBtn.onclick = () => {
            let productId = imgBtn.getAttribute("data-product-id");
            localStorage.setItem("selectedProductId", productId);
            window.location.href = `verDetalleProducto.html?id=${productId}`;
        };
    });
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
    let panelElemento = document.querySelector("#panelMenu");
    panelElemento.classList.remove("panelMenuDesactivado");
    panelElemento.classList.add("panelMenuActivado");
    menuAbierto = true;
}

function cerrarMenu() {
    let panelElemento = document.querySelector("#panelMenu");
    panelElemento.classList.add("panelMenuDesactivado");
    panelElemento.classList.remove("panelMenuActivado");
    menuAbierto = false;
}

function abrirCarrito() {
    let panelElemento = document.querySelector("#panelCart");
    panelElemento.classList.remove("panelCartDesactivado");
    panelElemento.classList.add("panelCartActivado");
    cartAbierto = true;
}

function cerrarCarrito() {
    let panelElemento = document.querySelector("#panelCart");
    panelElemento.classList.add("panelCartDesactivado");
    panelElemento.classList.remove("panelCartActivado");
    cartAbierto = false;
}


      
      async function showProduct() {
        let query = await new ProductDAO().getProducts();
        let products = query.data;
        let tbodyElement = document.querySelector("#productContainer");
        products.forEach(product => {
            let div = document.createElement('div');
            div.innerHTML = `
                <img src="../../../../backEnd/imgs/${product.productId}.${product.extension}" class="imgProduct" data-product-id="${product.productId}"></img>
            `;
            div.onclick = ()=>{
                activarVerDetalle(product.productId);
            }
            tbodyElement.appendChild(div);
        });
    }


    function activarVerDetalle(id){
       window.location.href = `../../Productos/verDetalleProducto/verDetalleProducto.html?id=${id}`;

    }




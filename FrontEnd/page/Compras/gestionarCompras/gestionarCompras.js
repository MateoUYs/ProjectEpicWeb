import SessionDAO from "../../../dao/sessionDAO.js";
import SaleDAO from "../../../dao/saleDAO.js";


let id = null;
let filter = "";
let allSales = [];

window.onload = async () => {
    let queryResponse = await new SaleDAO().getAll();
    allSales = queryResponse.data;
    console.log(allSales);
    let query = await new SessionDAO().getSession();
    if (query.status) {
        if (query.data.isAdmin == 0) {
            window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
        }
    } else {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
    }
    showSales(allSales);
    // addEvents();
}

async function showSales(sales) {
    let tbodyElement = document.querySelector("#saleData");
    let divAlert = document.querySelector("#alertDiv");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = divAlert.querySelector("form");
    tbodyElement.innerHTML = "";
    sales.forEach((sale) => {
        let tr = document.createElement("tr");
        tr.innerHTML += `
             <td>${sale.saleId}</td>
             <td>${sale.paymentMethod}</td>
             <td>${sale.paymentStatus}</td>
             <td>${sale.saleStatus}</td>
             <td>${sale.shippingMethod}</td>
             <td>${sale.shippingAddress}</td>
             <td>${sale.userName}</td>
             <td>${sale.saleDate}</td>
        `;
        let td = document.createElement("td");
        let div = document.createElement("div");
        let btn = document.createElement("button");
        td.appendChild(div);
        div.appendChild(btn);
        tr.appendChild(td);


        btn.className = "btnTd";
        btn.innerHTML = `<img class="modifyImg" src="../../../assets/modifyIcon.png">`;
        btn.onclick = () => {
            loadInputs(product);
        }

        let btn2 = document.createElement("button");
        btn2.innerHTML = `<img src="../../../assets/view.png">`;
        div.appendChild(btn2);
        btn2.className = "btnTd";
        btn2.onclick = () => {
            loadInputs(sale);
        }

        div.id = "actionsTd";
        tbodyElement.appendChild(tr);

    });
}

// function addEvents() {
//     let body = document.querySelector("body");
//     let addBtn = document.querySelector("#addBtn");
//     let divFrm = document.querySelector("#productFrm");
//     let cancelarBtn = document.querySelector("#cancelBtn");
//     let frmProduct = document.querySelector("#productFrm form");
//     let inputFile = document.querySelector("#imagenInput");
//     let imgPreview = document.querySelector("#imgPreview");
//     let consultationBtn = document.querySelector("#inquiryBtn");
//     let listConsultation = document.querySelector("#inquiryList");
//     let homeBtn = document.querySelector("#homeBtn");
//     let btnLogOut = document.querySelector("#btnLogOut");
//     let pTitle = document.querySelector("#title");
//     let divAlert = document.querySelector("#alertDiv");
//     let pAlertTitle = document.querySelector("#alertTitle");
//     let alertQuestion = document.querySelector("#question");
//     let frmAlert = divAlert.querySelector("form");
//     let alertCancel = document.querySelector("#btnCancelAlert");
//     let message = document.querySelector("#message");
//     let confirmationAlert = document.querySelector("#confirmationAlert");
//     let menuBtn = document.querySelector("#menuBtn");
//     let navDiv = document.querySelector("#navDiv");
//     let nav = document.querySelector("nav");
//     let searchInput = document.querySelector("#searchInput");


//     addBtn.onclick = () => {
//         divFrm.classList.remove("frmDeactivated");
//         divFrm.classList.add("frmActivated");
//         body.classList.add("modalOpen");
//         pTitle.innerHTML = "Agregando Producto";
//         frmProduct.submit.value = "Agregar";
//     }

//     cancelarBtn.onclick = () => {
//         divFrm.classList.add("frmDeactivated");
//         divFrm.classList.remove("frmActivated");
//         body.classList.remove("modalOpen");
//         frmProduct.reset();
//         imgPreview.src = "../../../assets/noImage.png";
//         message.innerHTML = "";
//         oldSizes = "";
//     }

//     inputFile.onchange = () => {
//         let rutaTemporal = URL.createObjectURL(inputFile.files[0]);
//         imgPreview.src = rutaTemporal;
//     }

//     consultationBtn.onclick = () => {
//         if (listConsultation.classList.contains("deactivated")) {
//             listConsultation.classList.add("activated");
//             listConsultation.classList.remove("deactivated");
//         } else {
//             listConsultation.classList.remove("activated");
//             listConsultation.classList.add("deactivated");
//         }
//     }

//     homeBtn.onclick = () => {
//         window.location.href = "../../Usuarios/indexAdmin/indexAdmin.html";
//     }

//     btnLogOut.onclick = () => {
//         divAlert.classList.add("alertActivated");
//         divAlert.classList.remove("alertDeactivated");
//         pAlertTitle.innerHTML = "Cerrar Sesión";
//         alertQuestion.innerHTML = "¿Estás seguro de que deseas cerrar sesión? Si cierras sesión, serás redirigido al Inicio de Sesión";
//         frmAlert.submit.value = "Cerrar Sesión";
//     }

//     frmProduct.onsubmit = (e) => {
//         e.preventDefault()
//         let productId = id;
//         let price = frmProduct.price.value;
//         let description = frmProduct.description.value;
//         let image = frmProduct.image.files[0];
//         let name = frmProduct.name.value;
//         let color = frmProduct.color.value;
//         let size = Array.from(frmProduct.querySelectorAll("input[name='size']:checked")).map(input => input.value);


//         if (frmProduct.submit.value == "Agregar") {
//             addProduct(price, description, image, name, color, size);

//         } else if (frmProduct.submit.value == "Modificar") {
//             modifyProduct(productId, price, description, image, name, color, size);
//         }

//     }

//     frmAlert.onsubmit = (e) => {
//         e.preventDefault();
//         if (frmAlert.submit.value == "Cerrar Sesión") {
//             setTimeout(async () => {
//                 confirmationAlert.innerHTML = "";
//                 logOut();
//             }, 500);
//         } else if (frmAlert.submit.value == "Eliminar Producto") {
//             let idProduct = frmAlert.getAttribute("dataProductId");
//             deleteProduct(idProduct);
//             setTimeout(async () => {
//                 divAlert.classList.add("alertDeactivated");
//                 divAlert.classList.remove("alertActivated");
//                 confirmationAlert.innerHTML = "";
//             }, 500);
//         }
//     }

//     alertCancel.onclick = () => {
//         divAlert.classList.add("alertDeactivated");
//         divAlert.classList.remove("alertActivated");
//         alertQuestion.innerHTML = "";
//         pAlertTitle.innerHTML = "";
//         frmAlert.submit.value = "";
//     }

//     menuBtn.onclick = () => {
//         if (menuBtn.classList.contains("hide")) {
//             navDiv.classList.add("deactivatedDiv");
//             navDiv.classList.remove("activatedDiv");
//             nav.classList.add("deactivatedNav");
//             nav.classList.remove("activatedNav");
//             menuBtn.src = "../../../assets/menu.png";
//         } else {
//             menuBtn.classList.remove("show");
//             menuBtn.classList.add("hide");
//             menuBtn.src = "../../../assets/closeIcon.png";
//         }
//     }

//     searchInput.onkeyup = () =>{
//         filter = searchInput.value;
//         console.log(filter);
//         searchProducts(filter);
//     }
// }
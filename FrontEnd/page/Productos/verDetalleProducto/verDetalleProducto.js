import ProductDAO from "../../../model/ProductDAO.js";

indow.onload = async () => {
    showProduct();
    addEvents();
}

async function showProduct() {
    let query = await new ProductDAO().getProducts();
    let products = query.data;
    let tbodyElement = document.querySelector("#infoProduct");
    tbodyElement.innerHTML = "";
    }
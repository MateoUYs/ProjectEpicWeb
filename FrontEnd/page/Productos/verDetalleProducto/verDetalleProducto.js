import ProductDAO from "../../../../FrontEnd/dao/ProductDAO.js";

indow.onload = async () => {
    showProduct();
    addEvents();
}

async function showProduct() {
    let query = await new ProductDAO().getProducts();
    let products = query.data;
    let tbodyElement = document.querySelector("#infoProduct");
    tbodyElement.innerHTML = "";
    products.forEach((product) => {
        console.log(JSON.stringify(product));
        let divElement = document.createElement("div");
        divElement.classList.add("productItem");
        divElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
        `;
        tbodyElement.appendChild(divElement);
        });
    }

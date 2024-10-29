import ProductDAO from "../../../dao/productDao.js";

window.onload = async () => {
   
    let id = new URLSearchParams(window.location.search).get("id");
    let product = await getProductById(id);
    showProduct(product);
    showImageProduct(product);

    console.log(id);

}

async function getProductById(id) {
    let query = await new ProductDAO().getProductDetails(id);
    console.log("aa",query);
    let product = query.data;
    return product;

}

function showProduct(product) {
    console.log("el producto es", product);
    let tbodyElement = document.querySelector("#infoProduct");
    let content = document.createElement('div');
        content.innerHTML = `
        <div>${product.name}</div>
        <div>${product.description}</div>
        <div>${product.price}</div>
        <div>${product.stock}</div>
            `;
        tbodyElement.appendChild(content);
}


async function showImageProduct(products) {
    let tbodyElement = document.querySelector("#imageProduct");
    products.forEach(product => {
        tbodyElement.innerHTML
        let div = document.createElement('div');
        contentImage.innerHTML = `
      <img src="../../../../backEnd/imgs/${product.productId}.${product.extension}">
            `;
        tbodyElement.appendChild(contentImage);
      });
}




    
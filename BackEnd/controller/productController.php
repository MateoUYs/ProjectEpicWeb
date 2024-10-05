<?php
require_once __DIR__ . "/../controller/configuration.php";
// Se incluye el archivo que contiene la definición de la clase 'products' y su método 'getProductsModel'
require_once __DIR__ . "/../dao/productDAO.php";

// Se obtiene el valor del parámetro 'function' de la solicitud GET
$funcion = isset($_GET['function']) ? $_GET['function'] : '';

// Se usa un switch para manejar diferentes valores del parámetro 'function'
switch ($funcion) {
    // Si el valor de 'function' es 'obtener', se llama a la función 'getProducts'
    case 'getProducts':
        getProducts();
        break;
    case 'addProduct':
        addProduct();
        break;
    case 'deleteProduct':
        deleteProduct();
        break;
    case 'modifyProduct':
        modifyProduct();
        break;
    case 'getProductDetails':
        getProductDetails();
        break;
    case 'addStock':
        addStock();
        break;
    case 'updateStock':
        updateStock();
        break;
    case 'getStock':
        getStock();
        break;
    case 'getProductSize':
        getProductSize();
        break;
    // Si el valor de 'function' no es reconocido, se devuelve un mensaje de error en formato JSON
    default:
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

// Función para obtener productos desde la base de datos y devolverlos en formato JSON
function getProducts()
{
    // Se crea una instancia de la clase 'products' y se llama al método 'getProductsModel' para obtener los productos
    $result = (new productsDAO())->getProducts();
    // Se codifica el resultado en formato JSON y se imprime
    echo json_encode($result);
}

// Función para agregar un producto
function addProduct()
{
    $price = $_POST["price"];
    $description = $_POST["description"];
    $image = $_FILES['image'];
    $name = $_POST["name"];
    $color = $_POST["color"];
    $sizeType = $_POST["size"];
    $result = (new productsDAO())->addProducts($price, $description, $image, $name, $color, $sizeType);
    echo json_encode($result);
}

// Función para eliminar un producto
function deleteProduct()
{
    $id = $_POST["productId"];
    $result = (new productsDAO())->deleteProducts($id);
    echo json_encode($result);
}

// Función para modificar un producto
function modifyProduct()
{
    $productId = $_POST["productId"];
    $price = $_POST["price"];
    $description = $_POST["description"];
    $image = isset($_FILES['image']) ? $_FILES['image'] : null;
    $name = $_POST["name"];
    $color = $_POST["color"];
    $sizeType = $_POST["size"];
    $oldSizes = $_POST["oldSizes"];
    $result = (new productsDAO())->modifyProducts($productId, $price, $description, $image, $name, $color, $sizeType, $oldSizes);
    echo json_encode($result);
}

// Función para obtener detalles de un producto específico
function getProductDetails()
{
    $productId = $_POST["productId"];
    $result = (new productsDAO())->getProductDetails($productId);
    echo json_encode($result);
}

function addStock()
{
    $productId = $_POST["productId"];
    $stock = $_POST["stock"];
    $result = (new productsDAO())->addStock($productId, $stock);
    echo json_encode($result);
}

function updateStock()
{
    $productId = $_POST["productId"];
    $stock = $_POST["stock"];
    $result = (new productsDAO())->updateStock($productId, $stock);
    echo json_encode($result);
}

function getStock()
{
    $result = (new productsDAO())->getStock();
    echo json_encode($result);
}

function getProductSize()
{
    $productId = $_POST["productId"];
    $result = (new productsDAO())->getProductSize($productId);
    echo json_encode($result);
}
?>
<?php
// Incluir el archivo buysDAO.php desde el directorio actual
require_once __DIR__ . "/../model/saleDAO.php";


// Obtener el parámetro 'function' desde la URL
$funcion = $_GET['function'];

// Evaluar la función solicitada
switch ($funcion) {
    case 'add':
        add(); 
        break;
    case 'getAll':
        getAll();
        break;
    case 'getUserSales':
        getUserSales();
        break;
    case 'getLastSales':
        getLastSales();
        break;
    case 'updateStatus':
        updateStatus();
        break;
    default:
        echo json_encode(['error' => 'Función no reconocida']); // Responder con un error si la función no es reconocida
        break;
}

// Función para obtener compras
function add(){
    $paymentMethod = ['paymentMethod'];
    $shippingMethod = ['shippingMethod'];
    $quantity = ['quantity'];
    $userCi = ['userCi'];
    $saleDate = ['saleDate'];
    $products = ['products'];
    $size = ['size'];
    $offerId = ['offerId'];

    $query = (new saleDAO())->add($paymentMethod, $shippingMethod, $quantity, $userCi, $saleDate, $products, $size, $offerId);
    echo json_encode($query);
}   

function getAll(){
    $query = (new saleDAO())->getAll();
    echo json_encode($query);
}

function getUserSales(){
    $userCi = ['userCi'];

    $query = (new saleDAO())->getUserSales($userCi);
    echo json_encode($query);
}

function getLastSales(){
    $yesterdayDate = ['yesterdayDate'];

    $query = (new saleDAO())->getLastSales($yesterdayDate);
    echo json_encode($query);
}

function updateStatus(){
    $saleId = ['saleId'];
    $saleStatus = ['saleStatus'];

    $query = (new saleDAO())->updateStatus($saleId, $saleStatus);
    echo json_encode($query);
}

?>
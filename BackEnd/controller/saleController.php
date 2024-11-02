<?php
// Incluir el archivo buysDAO.php desde el directorio actual
require_once __DIR__ . "/../dao/saleDAO.php";
require_once __DIR__ . "/../config/configuration.php";


// Obtener el parámetro 'function' desde la URL
$funcion = isset($_GET['function']) ? $_GET['function'] : '';

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
    case 'addTrackingNumber':
        addTrackingNumber();
        break;
    default:
        echo json_encode(['error' => 'Función no reconocida']); // Responder con un error si la función no es reconocida
        break;
}

// Función para obtener compras
function add(){
    $shippingAddress = $_POST['shippingAddress'];
    $paymentMethod = $_POST['paymentMethod'];
    $shippingMethod = $_POST['shippingMethod'];
    $saleDate = $_POST['saleDate'];
    $products = json_decode($_POST['products'],true);


    $query = (new saleDAO())->add($shippingAddress, $paymentMethod, $shippingMethod, $saleDate, $products);
    echo json_encode($query);
}   

function getAll(){
    $query = (new saleDAO())->getAll();
    echo json_encode($query);
}

function getUserSales(){

    $query = (new saleDAO())->getUserSales();
    echo json_encode($query);
}

function getLastSales(){
    $yesterdayDate = $_POST['yesterdayDate'];

    $query = (new saleDAO())->getLastSales($yesterdayDate);
    echo json_encode($query);
}

function updateStatus(){
    $saleId = $_POST['saleId'];
    $saleStatus = $_POST['saleStatus'];

    $query = (new saleDAO())->updateStatus($saleId, $saleStatus);
    echo json_encode($query);
}

function addTrackingNumber(){
    $saleId = $_POST['saleId'];
    $trackingNumber = $_POST['trackingNumber'];

    $query = (new saleDAO())->addTrackingNumber($saleId, $trackingNumber);
    echo json_encode($query);
}

?>
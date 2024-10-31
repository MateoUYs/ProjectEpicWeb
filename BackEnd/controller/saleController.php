<?php
// Incluir el archivo buysDAO.php desde el directorio actual
require_once __DIR__ . "/../dao/saleDAO.php";


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
    $products = json_encode($_POST['products']);


    $query = (new saleDAO())->add($shippingAddress, $paymentMethod, $shippingMethod, $saleDate, $products);
    echo json_encode($query);
}   

function getAll(){
    $query = (new saleDAO())->getAll();
    echo json_encode($query);
}

function getUserSales(){
    $userCi = $_POST['userCi'];

    $query = (new saleDAO())->getUserSales($userCi);
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

?>
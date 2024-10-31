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
    $direccion = $_POST['direccion'];
    $metodoPago = $_POST['metodoPago'];
    $metodoEnvio = $_POST['metodoEnvio'];
    $fechaVenta = $_POST['fechaVenta'];
    $products = json_encode($_POST['products']);


    // $query = (new saleDAO())->add($paymentMethod, $shippingMethod, $quantity, $userCi, $saleDate, $products, $size, $offerId);
    // echo json_encode($query);
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
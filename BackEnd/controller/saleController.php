<?php
// Incluir el archivo buysDAO.php desde el directorio actual
require_once __DIR__ . "/../model/saleDAO.php";


// Obtener el parámetro 'function' desde la URL
$funcion = $_GET['function'];

// Evaluar la función solicitada
switch ($funcion) {
    case 'add':
        add(); // Llamar a la función getBuys() si 'function' es 'obtener'
        break;
    default:
        echo json_encode(['error' => 'Función no reconocida']); // Responder con un error si la función no es reconocida
        break;
}

// Función para obtener compras
function add(){
    // $title = $_POST['title'];
    // $description = $_POST['description'];
    // $endDate = $_POST['endDate'];
    // $startDate = $_POST['startDate'];
    // $discount = $_POST['discount'];
    // $products = $_POST['products'];

    // $query = (new saleDAO())->add($title, $description, $endDate, $startDate, $discount, $products);
    // echo json_encode($query); // Convertir el resultado a JSON y enviarlo como respuesta
}

?>
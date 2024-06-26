<?php
// Incluir el archivo buysDAO.php desde el directorio actual
require_once __DIR__ . "/../model/buysDAO.php";

// Obtener el parámetro 'function' desde la URL
$funcion = $_GET['function'];

// Evaluar la función solicitada
switch ($funcion) {
    case 'obtener':
        getBuys(); // Llamar a la función getBuys() si 'function' es 'obtener'
        break;
    default:
        echo json_encode(['error' => 'Función no reconocida']); // Responder con un error si la función no es reconocida
        break;
}

// Función para obtener compras
function getBuys(){
    // Crear una instancia de la clase buys y llamar al método getBuysModel()
    $result = (new buys())->getBuysModel();
    echo json_encode($result); // Convertir el resultado a JSON y enviarlo como respuesta
}

?>
<?php
require_once __DIR__ . "../model/buysDAO.php";

$funcion = $_GET['function'];

switch ($funcion) {
    case 'obtener':
        getBuys();
        break;
    default:
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

function getBuys(){
    $result = (new buys())->getBuysModel();
    echo json_encode($result);
}

?>
<?php
require_once __DIR__ . "/../config/configuration.php";

require_once __DIR__ . "/../dao/statsDAO.php";

$funcion = isset($_GET['function']) ? $_GET['function'] : '';

switch ($funcion) {

    case 'getBestSellings':
        getBestSellings();
        break;
    case 'getLeastSold':
        getLeastSold();
        break;
    case 'getMostSaved':
        getMostSaved();
        break;
    default:
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

function getBestSellings(){
    $query = (new statsDAO())->getBestSellings();
    echo json_encode($query);
}

function getLeastSold(){
    $query = (new statsDAO())->getLeastSold();
    echo json_encode($query);
}

function getMostSaved(){
    $query = (new statsDAO())->getMostSaved();
    echo json_encode($query);
}


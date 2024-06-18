<?php

require_once __DIR__ . "../model/userDAO.php";

$funcion = $_GET['function'];

switch ($funcion) {
    case 'obtener':
        break;
}

function getUsers(){
    $result = (new user())->getUsersModel();
    echo json_encode($result);
}

?>

<?php

require_once __DIR__ . "../model/offerDAO.php";

$funcion = $_GET['function'];

switch ($funcion) {

    case 'add':
        add();
        break;

    default:
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}


function add(){
    $title = $_POST['title'];
    $description = $_POST['description'];
    $endDate = $_POST['endDate'];
    $startDate = $_POST['startDate'];
    $discount = $_POST['discount'];
    $products = $_POST['products'];

    $query = (new offerDAO())->add($title, $description, $endDate, $startDate, $discount, $products);
    echo json_encode($query); 
}

function get(){
    $result = (new offerDAO())->get();
    echo json_encode($result);
}


?>
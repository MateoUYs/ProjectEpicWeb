<?php

require_once __DIR__ . "/../dao/offerDAO.php";

$funcion = $_GET['function'];

switch ($funcion) {

    case 'add':
        add();
        break;
    case 'get':
        get();
        break;
    case 'delete':
        delete();
        break;
    case 'modify':
        modify();
        break;
    default:
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}


function add()
{
    $title = $_POST['title'];
    $description = $_POST['description'];
    $endDate = $_POST['endDate'];
    $startDate = $_POST['startDate'];
    $discount = $_POST['discount'];
    $products = $_POST['products'];

    $query = (new offerDAO())->add($title, $description, $endDate, $startDate, $discount, $products);
    echo json_encode($query);
}

function get()
{
    $query = (new offerDAO())->get();
    echo json_encode($query);   
}

function delete(){
    $offerId = $_POST['offerId'];

    $query = (new offerDAO())->delete($offerId);
    echo json_encode($query);
}

function modify(){
    $offerId = $_POST['offerId'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $endDate = $_POST['endDate'];
    $startDate = $_POST['startDate'];
    $discount = $_POST['discount'];
    $products = $_POST['products'];
    $oldProducts = $_POST['products'];

    $query = (new offerDAO())->modify($offerId, $title, $description, $endDate, $startDate, $discount, $products, $oldProducts);
    echo json_encode($query);
}


?>
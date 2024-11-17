<?php

// Requiere el archivo userDAO.php que contiene la definición de la clase 'user' y sus métodos
require_once __DIR__ . '/../dao/userDAO.php';
require_once __DIR__ . '/../config/configuration.php';

// Obtiene el parámetro 'function' de la URL
$funcion = isset($_GET['function']) ? $_GET['function'] : '';

// Realiza una acción diferente dependiendo del valor de '$funcion'
switch ($funcion) {
    // Si el valor de '$funcion' es 'x', se llama a la función x()
    case 'get':
        getUsers();
        break;
    case 'add':
        addUser();
        break;
    case 'delete':
        deleteUser();
        break;
    case 'modify':
        modifyUser();
        break;
    case 'verify':
        verifyUser();
        break;
    default:
        // Si el valor de '$funcion' no coincide con ningún caso, se puede manejar aquí
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

// Función para obtener los usuarios de la base de datos
function getUsers() {
    $result = (new userDAO())->getUsers();
    echo json_encode($result);
}

// Función para agregar un usuario
function addUser() {
    $ci = $_POST["ci"];
    $userName = $_POST["userName"];
    $password  = $_POST["password"];
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $correo  = $_POST["email"];
    $phone = $_POST["phone"];    
    
    $result = (new userDAO)->addUser($ci,$correo,$userName,$hashedPassword,$phone);
    echo json_encode($result);
}

// Función para eliminar un usuario
function deleteUser() {
    $ci = $_POST["ci"];
    $result = (new userDAO)->deleteUser($ci);
    echo json_encode($result);
}

// Función para modificar un usuario
function modifyUser() {
    $userName = $_POST["userName"];
    $password  = $_POST["password"];
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $correo  = $_POST["email"];
    $phone = $_POST["phone"]; 

    $result = (new userDAO)->modifyUser($correo,$userName,$hashedPassword,$phone);
    echo json_encode($result);    
}



// Función para verificar un usuario
function verifyUser() {
    $email = $_POST["email"];
    $codigoVerif = $_POST["code"];

    $result = (new userDAO)->verifyUser($email, $codigoVerif);
    echo json_encode($result);
}

?>

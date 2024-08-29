<?php

// Requiere el archivo userDAO.php que contiene la definición de la clase 'user' y sus métodos
require_once __DIR__ . "../model/userDAO.php";

// Obtiene el parámetro 'function' de la URL
$funcion = isset($_GET['function']) ? $_GET['function'] : '';

// Realiza una acción diferente dependiendo del valor de '$funcion'
switch ($funcion) {
    case 'obtener':
        // Si el valor de '$funcion' es 'obtener', se llama a la función getUsers()
        getUsers();
        break;
    case 'agregarUsuario':
        // Si el valor de '$funcion' es 'agregarUsuario', se llama a la función agregarUsuario()
        agregarUsuario();
        break;
    case 'eliminarUsuario':
        // Si el valor de '$funcion' es 'eliminarUsuario', se llama a la función eliminarUsuario()
        eliminarUsuario();
        break;
    case 'modificarUsuario':
        // Si el valor de '$funcion' es 'modificarUsuario', se llama a la función modificarUsuario()
        modificarUsuario();
        break;
    case 'iniciarSesion':
        // Si el valor de '$funcion' es 'iniciarSesion', se llama a la función iniciarSesion()
        iniciarSesion();
        break;
    case 'verificarUsuario':
        // Si el valor de '$funcion' es 'verificarUsuario', se llama a la función verificarUsuario()
        verificarUsuario();
        break;
    default:
        // Si el valor de '$funcion' no coincide con ningún caso, se puede manejar aquí
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

// Función para obtener los usuarios de la base de datos
function getUsers() {
    // Implementación pendiente
}

// Función para agregar un usuario
function agregarUsuario() {
    // Implementación pendiente
    $usuario = $_POST["user"];
    $password  = $_POST["password"];
    $correo  = $_POST["correo"];
    
    (new userDAO)->agregarUsuario($correo,$usuario,$password);
}

// Función para eliminar un usuario
function eliminarUsuario() {
    // Implementación pendiente
}

// Función para modificar un usuario
function modificarUsuario() {
    // Implementación pendiente
}

// Función para iniciar sesión
function iniciarSesion() {
    // Implementación pendiente
}

// Función para verificar un usuario
function verificarUsuario() {
    // Implementación pendiente
}

?>

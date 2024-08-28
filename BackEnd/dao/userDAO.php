<?php
// Requiere el archivo connection.php que contiene la función de conexión a la base de datos
require_once __DIR__ . "../controller/connection.php";

class user{
    // Método para obtener los usuarios desde el modelo (base de datos)
    function getUsersModel(){
        // Establece la conexión a la base de datos utilizando la función connection() del archivo connection.php
        $connection = connection();
        
        // Define la consulta SQL para seleccionar todos los registros de la tabla 'users'
        $sql = "SELECT * FROM users";
        
        // Ejecuta la consulta SQL y almacena el resultado en la variable $result
        $result = $connection->query($sql);
        
        // Recupera todos los registros de la consulta como un array de arrays asociativos
        // Cada array asociativo representa una fila de la tabla 'users'
        $users = $result->fetch_all(MYSQLI_ASSOC);
        
        // Devuelve el array de arrays asociativos con los registros de la tabla 'users'
        return $users;
    }

    function agregarUsuario() {
        // Implementación pendiente
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
    
}

?>
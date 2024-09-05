<?php
// Requiere el archivo connection.php que contiene la función de conexión a la base de datos
require_once __DIR__ . "/../controller/connection.php";
require_once __DIR__ . "/answer.php";

class userDAO
{
    // Método para obtener los usuarios desde el modelo (base de datos)
    function getUsersModel()
    {
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
        $answer = new answer(true,"Usuarios obtenidos",$users);
        return $answer;
    }

    function agregarUsuario($ci, $correo, $usuario, $password, $telefono)
    {
        $codigoUnico=uniqid();

        $sql = "INSERT INTO `usuario` (`email`, `ci`, `username`, `password`, `telefono`,codigoVerificacion,isVerficada,isAdmin) VALUES ('$correo', '$ci' ,'$usuario', '$password', '$telefono','$codigoUnico',0,0);";
        $connection = connection();
        try {
            $connection->query($sql);
            $answer = new answer(true,"Usuario agregado con éxito",null);
        } catch (Exception $e) {
            $answer = new answer(false,"No se pudo agregar el usuario (ci ya existe)",null);
        }

        

        $para= $correo;
        $asunto = 'Codigo de validacion';
        $descripcion   = ''.$codigoUnico;
        $de = 'projectEpicWeb@gmail.com';

        if (!mail($para, $asunto, $descripcion, $de)){
            $answer = new answer(false,"No se pudo enviar el correo de verificacion",null);
            return $answer;
        }
        return $answer;
    }

    // Función para eliminar un usuario
    function eliminarUsuario($ci)
    {
        $sql = "DELETE FROM usuario WHERE ci = '$ci'";
        $connection = connection();
        try {
            $result = $connection->query($sql);
            $answer = new answer(true, "Usuario eliminado", null);
        } catch (Exception $e) {
            $answer = new answer(false, "No se pudo eliminar el usuario (ci incorrecta)", null);
        }
        return $answer;
    }

    // Función para modificar un usuario
    function modificarUsuario($ci, $email, $usuario, $password, $telefono)
    {
        $sql = "UPDATE usuario SET email ='$email', username = '$usuario', password ='$password', telefono ='$telefono' WHERE ci = '$ci'";
        $connection = connection();
        try {
            $result = $connection->query($sql);
            $answer = new answer(true, "Usuario modificado", null);
        } catch (Exception $e) {
            $answer = new answer(false, "No se pudo modificar el usuario (ci incorrecta)", null);
        }
        return $answer;
    }

    // Función para verificar un usuario
    function verificarUsuario()
    {
        // Implementación pendiente
    }

}

?>
<?php
// Requiere el archivo connection.php que contiene la función de conexión a la base de datos y el modelo de query
require_once __DIR__ . "/../controller/connection.php";
require_once __DIR__ . "/query.php";

class userDAO
{
    // Método para obtener los usuarios desde el modelo (base de datos)
    function getUsers()
    {
        // Establece la conexión a la base de datos utilizando la función connection() del archivo connection.php
        $connection = connection();

        // Define la consulta SQL para seleccionar todos los registros de la tabla 'users'
        $sql = "SELECT * FROM usuario";

        // Ejecuta la consulta SQL y almacena el resultado en la variable $result
        $result = $connection->query($sql);

        // Recupera todos los registros de la consulta como un array de arrays asociativos
        // Cada array asociativo representa una fila de la tabla 'users'
        $users = $result->fetch_all(MYSQLI_ASSOC);

        // Devuelve el array de arrays asociativos con los registros de la tabla 'users'
        $query = new query(true, "Usuarios obtenidos", $users);
        return $query;
    }

    function addUser($ci, $correo, $usuario, $password, $telefono)
    {
        $codigoUnico = uniqid();
        $sql = "INSERT INTO `usuario` (`email`, `ci`, `username`, `password`, `telefono`,codigoVerificacion,isVerficada,isAdmin) VALUES ('$correo', '$ci' ,'$usuario', '$password', '$telefono','$codigoUnico',0,0);";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Usuario agregado con exito", $ci);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo agregar el usuario (ci ya existe)", null);
        }

        $para = $correo;
        $asunto = 'Verificación de tu cuenta en TopStyleShop';
        $descripcion = '¡Hola Usuario!

Gracias por registrarte en TopStyleShop. Antes de que puedas comenzar a disfrutar de nuestras ofertas y productos exclusivos, necesitamos verificar tu dirección de correo electrónico.

Por favor, utiliza el siguiente código de verificación para completar tu registro:

Código de verificación: ' . $codigoUnico .

'
Si no solicitaste la creación de esta cuenta, por favor ignora este correo.

Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.

¡Gracias por unirte a TopStyleShop!

Saludos,
El equipo de TopStyleShop';
        $de = 'projectEpicWeb@gmail.com';

        if (!mail($para, $asunto, $descripcion, $de)) {
            $query = new query(false, "No se pudo enviar el correo de verificacion", null);
            return $query;
        }
        return $query;
    }

    // Función para eliminar un usuario
    function deleteUser($ci)
    {
        $sql = "DELETE FROM usuario WHERE ci = '$ci'";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Usuario eliminado", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo eliminar el usuario (ci incorrecta)", null);
        }
        return $query;
    }

    // Función para modificar un usuario
    function modifyUser($ci, $email, $usuario, $password, $telefono)
    {
        $sql = "UPDATE usuario SET email ='$email', username = '$usuario', password ='$password', telefono ='$telefono' WHERE ci = '$ci'";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Usuario modificado", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo modificar el usuario (ci incorrecta)", null);
        }
        return $query;
    }

    // Función para verificar un usuario
    function verifyUser($email, $codigoVerificacion)
    {
        $connection = connection();
        $sql = "UPDATE usuario SET isVerificada = 1 WHERE  email = '$email' AND codigoVerificacion  = '$codigoVerificacion'";
        $connection->query($sql);
        $filasAfectadas = $connection->affected_rows;

        if ($filasAfectadas == 1) {
            $query = new query(true, "cuenta verificada", null);
            return $query;
        } else {
            $query = new query(false, "Email de Usuario incorrecto", null);
            return $query;
        }
    }

}

?>
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-09-2024 a las 00:26:45
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `topstyleshop`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `ispay` tinyint(1) NOT NULL,
  `estado_compra` varchar(255) NOT NULL,
  `nro_rastreo` varchar(25) NOT NULL,
  `id` int(11) NOT NULL,
  `ciUsuario` varchar(255) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compraproducto`
--

CREATE TABLE `compraproducto` (
  `idProducto` int(11) NOT NULL,
  `idCompra` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `talle` varchar(10) NOT NULL,
  `idOferta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consulta`
--

CREATE TABLE `consulta` (
  `idConsulta` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `ciUsuario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje`
--

CREATE TABLE `mensaje` (
  `idMensaje` int(11) NOT NULL,
  `mensaje` text NOT NULL,
  `idConsulta` int(11) NOT NULL,
  `ciUsuario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta`
--

CREATE TABLE `oferta` (
  `idOferta` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `fechaFin` date NOT NULL,
  `fechaInicio` date NOT NULL,
  `descuento` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `extension` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `precio`, `stock`, `descripcion`, `extension`, `nombre`, `color`) VALUES
(1, 1200, 50, 'Remera Oversize Black Washed - Spider', 'png', 'Remera Washed - Spider', '#000000'),
(2, 100, 20, 'Camisa casual', 'jpg', 'Camisa Azul', 'Azul'),
(3, 150, 15, 'Pantalón de vestir', 'jpg', 'Pantalón Negro', 'Negro'),
(4, 75, 30, 'Camiseta deportiva', 'jpg', 'Camiseta Roja', 'Rojo'),
(5, 120, 25, 'Chaqueta impermeable', 'jpg', 'Chaqueta Verde', 'Verde'),
(6, 80, 40, 'Sombrero de lana', 'jpg', 'Sombrero Gris', 'Gris'),
(7, 90, 35, 'Bufanda de algodón', 'jpg', 'Bufanda Blanca', 'Blanco'),
(8, 110, 10, 'Zapatos de cuero', 'jpg', 'Zapatos Marrones', 'Marrón'),
(9, 200, 5, 'Abrigo de invierno', 'jpg', 'Abrigo Negro', 'Negro'),
(10, 60, 50, 'Guantes térmicos', 'jpg', 'Guantes Grises', 'Gris'),
(11, 130, 18, 'Gafas de sol', 'jpg', 'Gafas Negras', 'Negro'),
(12, 55, 28, 'Cinturón de cuero', 'jpg', 'Cinturón Marrón', 'Marrón'),
(13, 140, 12, 'Chaqueta de cuero', 'jpg', 'Chaqueta Negra', 'Negro'),
(14, 95, 22, 'Camisa formal', 'jpg', 'Camisa Blanca', 'Blanco'),
(15, 85, 40, 'Corbata de seda', 'jpg', 'Corbata Roja', 'Rojo'),
(16, 150, 10, 'Botas de montaña', 'jpg', 'Botas Marrones', 'Marrón'),
(17, 70, 38, 'Chaleco de lana', 'jpg', 'Chaleco Gris', 'Gris'),
(18, 105, 25, 'Jersey de punto', 'jpg', 'Jersey Azul', 'Azul'),
(19, 175, 8, 'Chaqueta de plumas', 'jpg', 'Chaqueta Gris', 'Gris'),
(20, 50, 55, 'Calcetines térmicos', 'jpg', 'Calcetines Negros', 'Negro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productocategoria`
--

CREATE TABLE `productocategoria` (
  `nombreCategoria` varchar(255) NOT NULL,
  `idProducto` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productotalle`
--

CREATE TABLE `productotalle` (
  `idProducto` int(11) NOT NULL,
  `tipoTalle` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productotalle`
--

INSERT INTO `productotalle` (`idProducto`, `tipoTalle`) VALUES
(1, 'L'),
(1, 'XXL'),
(2, 'L'),
(2, 'M'),
(2, 'XL'),
(3, 'M'),
(3, 'S'),
(4, 'L'),
(4, 'XL'),
(4, 'XXL'),
(5, 'L'),
(5, 'M'),
(5, 'XXL'),
(6, 'L'),
(6, 'M'),
(6, 'S'),
(7, 'M'),
(7, 'XL'),
(8, 'L'),
(8, 'XXL'),
(9, 'L'),
(9, 'M'),
(9, 'S'),
(9, 'XL'),
(10, 'M'),
(10, 'S'),
(10, 'XXL'),
(11, 'L'),
(11, 'XL'),
(12, 'L'),
(12, 'M'),
(12, 'S'),
(13, 'L'),
(13, 'M'),
(13, 'XXL'),
(14, 'M'),
(14, 'S'),
(15, 'L'),
(15, 'XXL'),
(16, 'L'),
(16, 'M'),
(16, 'XL'),
(17, 'M'),
(17, 'S'),
(17, 'XXL'),
(18, 'L'),
(18, 'XL'),
(19, 'L'),
(19, 'M'),
(19, 'S'),
(19, 'XXL'),
(20, 'L'),
(20, 'M');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `talle`
--

CREATE TABLE `talle` (
  `tipo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `talle`
--

INSERT INTO `talle` (`tipo`) VALUES
('L'),
('M'),
('S'),
('XL'),
('XXL');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `email` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `isVerficada` tinyint(1) NOT NULL,
  `ci` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `codigoVerificacion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`email`, `isAdmin`, `isVerficada`, `ci`, `username`, `password`, `telefono`, `codigoVerificacion`) VALUES
('projectepicweb@gmail.com', 1, 1, '1', 'Admin', '$2y$10$7w.qkpLc0Kg0wKr/x7HubuzXrTHUTW4GnWVzjEIKVtP8fA/pSBkkq', '093540768', '66dd3cd263a75'),
('bas.gdmc@gmail.com', 0, 1, '55558115', 'Lautaro', '$2y$10$6NhtHZZkV18mI9I2.hEmVeXuwW.a37hhY7YmwJTIcjqtxQbfErmTi', '097385962', '66dd3cfe0c04a'),
('a@a', 0, 0, '556', 'Lautaro', '$2y$10$rzhh6swpnq90hXojUy1KBO0Zfa0OqNWFKBeH5HkMhv0z62JoLxWvG', '097', '66dd3d20f3f58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarioproductofavorito`
--

CREATE TABLE `usuarioproductofavorito` (
  `ciUsuario` varchar(255) NOT NULL,
  `idProducto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`nombre`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ciUsuario` (`ciUsuario`);

--
-- Indices de la tabla `compraproducto`
--
ALTER TABLE `compraproducto`
  ADD PRIMARY KEY (`id`,`idProducto`,`idCompra`,`idOferta`) USING BTREE,
  ADD KEY `idCompra` (`idCompra`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idOferta` (`idOferta`);

--
-- Indices de la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD PRIMARY KEY (`idConsulta`),
  ADD KEY `ciUsuario` (`ciUsuario`);

--
-- Indices de la tabla `mensaje`
--
ALTER TABLE `mensaje`
  ADD PRIMARY KEY (`idMensaje`),
  ADD KEY `idConsulta` (`idConsulta`),
  ADD KEY `mensaje_ci` (`ciUsuario`);

--
-- Indices de la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD PRIMARY KEY (`idOferta`) USING BTREE,
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`);

--
-- Indices de la tabla `productocategoria`
--
ALTER TABLE `productocategoria`
  ADD PRIMARY KEY (`nombreCategoria`,`idProducto`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `productotalle`
--
ALTER TABLE `productotalle`
  ADD PRIMARY KEY (`idProducto`,`tipoTalle`) USING BTREE,
  ADD KEY `tipoTalle` (`tipoTalle`);

--
-- Indices de la tabla `talle`
--
ALTER TABLE `talle`
  ADD PRIMARY KEY (`tipo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ci`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `usuarioproductofavorito`
--
ALTER TABLE `usuarioproductofavorito`
  ADD PRIMARY KEY (`idProducto`,`ciUsuario`),
  ADD KEY `ciUsuario` (`ciUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `compraproducto`
--
ALTER TABLE `compraproducto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `consulta`
--
ALTER TABLE `consulta`
  MODIFY `idConsulta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mensaje`
--
ALTER TABLE `mensaje`
  MODIFY `idMensaje` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `oferta`
--
ALTER TABLE `oferta`
  MODIFY `idOferta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`ciUsuario`) REFERENCES `usuario` (`ci`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `compraproducto`
--
ALTER TABLE `compraproducto`
  ADD CONSTRAINT `compraproducto_ibfk_1` FOREIGN KEY (`idCompra`) REFERENCES `compra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compraproducto_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compraproducto_ibfk_3` FOREIGN KEY (`idOferta`) REFERENCES `oferta` (`idOferta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD CONSTRAINT `consulta_ibfk_1` FOREIGN KEY (`ciUsuario`) REFERENCES `usuario` (`ci`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mensaje`
--
ALTER TABLE `mensaje`
  ADD CONSTRAINT `mensaje_ci` FOREIGN KEY (`ciUsuario`) REFERENCES `usuario` (`ci`),
  ADD CONSTRAINT `mensaje_ibfk_1` FOREIGN KEY (`idConsulta`) REFERENCES `consulta` (`idConsulta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD CONSTRAINT `oferta_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productocategoria`
--
ALTER TABLE `productocategoria`
  ADD CONSTRAINT `productocategoria_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productocategoria_ibfk_2` FOREIGN KEY (`nombreCategoria`) REFERENCES `categoria` (`nombre`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productotalle`
--
ALTER TABLE `productotalle`
  ADD CONSTRAINT `productotalle_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productotalle_ibfk_2` FOREIGN KEY (`tipoTalle`) REFERENCES `talle` (`tipo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarioproductofavorito`
--
ALTER TABLE `usuarioproductofavorito`
  ADD CONSTRAINT `usuarioproductofavorito_ibfk_1` FOREIGN KEY (`ciUsuario`) REFERENCES `usuario` (`ci`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarioproductofavorito_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

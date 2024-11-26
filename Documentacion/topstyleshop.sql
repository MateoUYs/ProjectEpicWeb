-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-11-2024 a las 16:29:23
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

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
-- Estructura de tabla para la tabla `inquiry`
--

CREATE TABLE `inquiry` (
  `inquiryId` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `isPublic` tinyint(1) NOT NULL,
  `isAnswered` tinyint(1) NOT NULL,
  `userCi` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inquiry`
--

INSERT INTO `inquiry` (`inquiryId`, `title`, `isPublic`, `isAnswered`, `userCi`) VALUES
(1, 'Consulta sobre descuentos', 1, 0, '12345678'),
(2, 'Problema con la cuenta', 1, 1, '23456789'),
(3, 'Sugerencia para nuevos productos', 1, 1, '34567890'),
(4, 'Consulta sobre tiempos de entrega', 1, 0, '45678901'),
(5, 'Opinión sobre el sitio web', 1, 1, '55558115'),
(6, 'Problema con la contraseña', 0, 1, '56789012'),
(7, 'Consulta sobre políticas de devolución', 0, 0, '67890123'),
(8, 'Solicitud de cambio de dirección', 0, 1, '78901234'),
(9, 'Consulta sobre método de pago', 0, 0, '89012345'),
(10, 'Revisión de pedido', 0, 1, '90123456');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `message`
--

CREATE TABLE `message` (
  `messageId` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `inquiryId` int(11) DEFAULT NULL,
  `userCI` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `message`
--

INSERT INTO `message` (`messageId`, `content`, `inquiryId`, `userCI`) VALUES
(1, '¿Qué descuentos están disponibles actualmente?', 1, '12345678'),
(2, 'Tengo problemas al iniciar sesión, ¿qué puedo hacer?', 2, '23456789'),
(3, 'Por favor intenta restablecer tu contraseña desde la sección de recuperación.', 2, '1'),
(4, '¿Pueden agregar más productos para verano?', 3, '34567890'),
(5, 'Gracias por tu sugerencia. La compartiremos con el equipo.', 3, '1'),
(6, '¿Cuánto tiempo tardan en entregar un pedido?', 4, '45678901'),
(7, 'Me gustaría darles mi opinión sobre el diseño del sitio.', 5, '55558115'),
(8, 'Gracias por tus comentarios. Los tomaremos en cuenta.', 5, '1'),
(9, 'No puedo cambiar mi contraseña, ¿pueden ayudarme?', 6, '56789012'),
(10, 'Claro, por favor verifica que cumplas los requisitos de seguridad.', 6, '1'),
(11, '¿Cuál es su política de devoluciones?', 7, '67890123'),
(12, 'Quiero cambiar mi dirección de envío.', 8, '78901234'),
(13, 'Por favor envíanos un correo con la nueva dirección.', 8, '1'),
(14, '¿Qué métodos de pago aceptan?', 9, '89012345'),
(15, 'Quiero revisar mi pedido, no he recibido actualizaciones.', 10, '90123456'),
(16, 'Por favor envíanos el número de pedido para revisarlo.', 10, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `offer`
--

CREATE TABLE `offer` (
  `offerId` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `discount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `offer`
--

INSERT INTO `offer` (`offerId`, `title`, `description`, `endDate`, `startDate`, `discount`) VALUES
(1, 'Oferta de Invierno', 'Descuento del 20% en productos seleccionados', '2024-11-16 00:00:00', '2024-11-01 00:00:00', 20),
(2, 'Ofertas de Verano', '30% de descuento en productos de temporada', '2024-01-31 00:00:00', '2023-12-01 00:00:00', 30),
(3, 'Descuento Black Friday', '50% de descuento en todas las categorías', '2024-11-30 00:00:00', '2024-11-25 00:00:00', 50),
(4, 'Oferta de Primavera', '15% de descuento en toda la tienda', '2024-09-30 00:00:00', '2024-09-01 00:00:00', 15),
(5, 'Oferta de Fin de Año', 'Descuento del 40% en productos seleccionados', '2024-12-31 00:00:00', '2024-12-01 00:00:00', 40);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `productId` int(11) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `extension` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`productId`, `price`, `stock`, `description`, `extension`, `name`, `color`) VALUES
(1, 1200, 48, 'Remera Oversize Black Washed - Spider', 'png', 'Remera Washed - Spider', '#000000'),
(2, 100, 20, 'Camisa casual', 'jpg', 'Camisa Azul', '#000000'),
(3, 150, 15, 'Pantalón de vestir', 'jpg', 'Pantalón Negro', 'black'),
(4, 75, 30, 'Camiseta deportiva', 'jpg', 'Camiseta Roja', 'red'),
(5, 120, 25, 'Chaqueta impermeable', 'jpg', 'Chaqueta Verde', 'green'),
(6, 80, 40, 'Sombrero de lana', 'jpg', 'Sombrero Gris', 'gray'),
(7, 90, 35, 'Bufanda de algodón', 'jpg', 'Bufanda Blanca', 'white'),
(8, 110, 10, 'Zapatos de cuero', 'jpg', 'Zapatos Marrones', 'brown'),
(9, 200, 3, 'Abrigo de invierno', 'jpg', 'Abrigo Negro', 'black'),
(10, 60, 50, 'Guantes térmicos', 'jpg', 'Guantes Grises', 'gray'),
(11, 130, 18, 'Gafas de sol', 'jpg', 'Gafas Negras', 'black'),
(12, 55, 28, 'Cinturón de cuero', 'jpg', 'Cinturón Marrón', 'brown'),
(13, 140, 12, 'Chaqueta de cuero', 'jpg', 'Chaqueta Negra', 'black'),
(14, 95, 22, 'Camisa formal', 'jpg', 'Camisa Blanca', 'white'),
(15, 85, 40, 'Corbata de seda', 'jpg', 'Corbata Roja', 'red'),
(16, 150, 10, 'Botas de montaña', 'jpg', 'Botas Marrones', 'brown'),
(17, 70, 38, 'Chaleco de lana', 'jpg', 'Chaleco Gris', 'gray'),
(18, 105, 25, 'Jersey de punto', 'jpg', 'Jersey Azul', 'blue'),
(19, 175, 8, 'Chaqueta de plumas', 'jpg', 'Chaqueta Gris', 'gray'),
(20, 50, 55, 'Calcetines térmicos', 'jpg', 'Calcetines Negros', 'black');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productoffer`
--

CREATE TABLE `productoffer` (
  `productId` int(11) NOT NULL,
  `offerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productoffer`
--

INSERT INTO `productoffer` (`productId`, `offerId`) VALUES
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 1),
(6, 3),
(7, 3),
(8, 3),
(9, 1),
(9, 3),
(10, 3),
(11, 4),
(12, 4),
(13, 4),
(14, 4),
(15, 4),
(16, 1),
(16, 5),
(17, 1),
(17, 5),
(18, 5),
(19, 5),
(20, 5);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `productsalesquantity`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `productsalesquantity` (
`saleQuantity` bigint(21)
,`productId` int(11)
,`price` int(11)
,`stock` int(11)
,`description` varchar(255)
,`extension` varchar(255)
,`name` varchar(255)
,`color` varchar(255)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productsize`
--

CREATE TABLE `productsize` (
  `productId` int(11) NOT NULL,
  `sizeType` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productsize`
--

INSERT INTO `productsize` (`productId`, `sizeType`) VALUES
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
-- Estructura de tabla para la tabla `saleproduct`
--

CREATE TABLE `saleproduct` (
  `saleProductId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `saleId` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `totalPrice` int(11) NOT NULL,
  `size` varchar(10) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `saleproduct`
--

INSERT INTO `saleproduct` (`saleProductId`, `productId`, `saleId`, `quantity`, `totalPrice`, `size`, `discount`) VALUES
(1, 1, 1, 3, 2400, 'XXL', 21),
(2, 2, 1, 1, 100, 'M', 0),
(3, 3, 2, 3, 450, 'M', 5),
(4, 4, 2, 1, 75, 'L', 22),
(5, 5, 3, 2, 240, 'M', 0),
(6, 6, 3, 1, 80, 'L', 0),
(7, 7, 4, 4, 360, 'M', 0),
(8, 8, 5, 1, 110, 'XXL', 0),
(9, 9, 6, 2, 400, 'M', 0),
(10, 9, 7, 3, 180, 'M', 0),
(11, 11, 8, 1, 130, 'L', 0),
(12, 12, 9, 2, 110, 'M', 0),
(13, 13, 10, 1, 140, 'L', 0),
(14, 14, 11, 3, 285, 'M', 0),
(15, 15, 12, 4, 340, 'XXL', 0),
(16, 16, 13, 1, 150, 'XL', 0),
(17, 17, 14, 2, 140, 'M', 0),
(18, 18, 15, 3, 315, 'L', 0),
(20, 2, 2, 2, 200, 'M', 0),
(21, 3, 3, 1, 150, 'M', 5),
(22, 4, 4, 3, 225, 'L', 22),
(23, 5, 5, 2, 240, 'M', 0),
(24, 6, 6, 1, 80, 'L', 0),
(25, 7, 7, 4, 360, 'M', 0),
(26, 8, 8, 1, 110, 'XXL', 0),
(27, 9, 9, 2, 400, 'M', 0),
(28, 10, 10, 3, 180, 'M', 0),
(29, 8, 11, 1, 130, 'L', 0),
(30, 12, 12, 2, 110, 'M', 0),
(31, 13, 13, 1, 140, 'L', 0),
(32, 14, 14, 3, 285, 'M', 0),
(33, 15, 15, 4, 340, 'XXL', 0),
(34, 16, 1, 1, 150, 'XL', 0),
(35, 17, 2, 2, 140, 'M', 0),
(36, 18, 3, 3, 315, 'L', 0),
(37, 19, 4, 1, 175, 'XXL', 0),
(38, 20, 5, 2, 100, 'M', 0),
(39, 1, 6, 3, 3600, 'XXL', 21),
(40, 2, 7, 4, 400, 'M', 0),
(41, 3, 8, 1, 150, 'M', 5),
(42, 4, 9, 2, 150, 'L', 22),
(43, 5, 10, 3, 360, 'M', 0),
(44, 6, 11, 1, 80, 'L', 0),
(45, 7, 12, 4, 360, 'M', 0),
(46, 8, 13, 1, 110, 'XXL', 0),
(47, 9, 14, 2, 400, 'M', 0),
(48, 10, 15, 3, 180, 'M', 0),
(49, 11, 1, 1, 130, 'L', 0),
(50, 12, 2, 2, 110, 'M', 0),
(51, 13, 3, 1, 140, 'L', 0),
(52, 14, 4, 3, 285, 'M', 0),
(53, 15, 5, 4, 340, 'XXL', 0),
(54, 16, 6, 1, 150, 'XL', 0),
(55, 17, 7, 2, 140, 'M', 0),
(56, 18, 8, 3, 315, 'L', 0),
(57, 19, 9, 1, 175, 'XXL', 0),
(58, 20, 10, 2, 100, 'M', 0),
(65, 9, 26, 2, 400, 'L', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `saleId` int(11) NOT NULL,
  `isPaid` tinyint(1) DEFAULT NULL,
  `paymentMethod` varchar(25) NOT NULL,
  `shippingMethod` varchar(20) NOT NULL,
  `shippingAddress` varchar(255) DEFAULT NULL,
  `saleStatus` varchar(255) DEFAULT NULL,
  `trackingNumber` varchar(25) DEFAULT NULL,
  `userCi` varchar(255) DEFAULT NULL,
  `saleDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`saleId`, `isPaid`, `paymentMethod`, `shippingMethod`, `shippingAddress`, `saleStatus`, `trackingNumber`, `userCi`, `saleDate`) VALUES
(1, 1, 'Tarjeta', 'Retiro', NULL, 'Entregado', NULL, '23456789', '2024-10-20 00:00:00'),
(2, 0, 'Efectivo', 'Envio', '123 Calle Principal', 'En espera de despachar el envío', 'TRK123457', '23456789', '2024-10-21 00:00:00'),
(3, 1, 'Tarjeta', 'Retiro', NULL, 'En espera en el local', NULL, '34567890', '2024-10-22 00:00:00'),
(4, 1, 'Tarjeta', 'Envio', '456 Avenida Central', 'En espera de despachar el envío', 'TRK223457', '34567890', '2024-10-23 00:00:00'),
(5, 0, 'Efectivo', 'Retiro', NULL, 'En espera en el local', NULL, '45678901', '2024-10-24 00:00:00'),
(6, 1, 'Tarjeta', 'Envio', '1010 Camino Real', 'Entregado', 'TRK323456', '56789012', '2024-10-25 00:00:00'),
(7, 1, 'Efectivo', 'Retiro', NULL, 'En espera en el local', NULL, '56789012', '2024-10-26 00:00:00'),
(8, 0, 'Tarjeta', 'Envio', '1010 Camino Real', 'En espera de despachar el envío', 'TRK323458', '56789012', '2024-10-27 00:00:00'),
(9, 1, 'Tarjeta', 'Retiro', NULL, 'En espera en el local', NULL, '67890123', '2024-10-28 00:00:00'),
(10, 0, 'Tarjeta', 'Envio', '2222 Calle Vieja', 'En espera de despachar el envío', 'TRK523456', '78901234', '2024-10-29 00:00:00'),
(11, 1, 'Tarjeta', 'Envio', '2222 Calle Vieja', 'En espera de despachar el envío', 'TRK523457', '78901234', '2024-10-30 00:00:00'),
(12, 1, 'Efectivo', 'Envio', '3333 Camino Verde', 'Entregado', 'TRK623456', '89012345', '2024-10-31 00:00:00'),
(13, 0, 'Tarjeta', 'Envio', '4444 Avenida Azul', 'En espera de despachar el envío', 'TRK123456', '90123456', '2024-10-31 00:00:00'),
(14, 1, 'Tarjeta', 'Envio', '4444 Avenida Azul', 'En espera de despachar el envío', 'TRK723457', '90123456', '2024-11-01 00:00:00'),
(15, 1, 'Efectivo', 'Envio', '5555 Calle Rojo', 'Entregado', 'TRK823456', '12345678', '2024-11-02 00:00:00'),
(26, 0, 'efectivo', 'Envio', 'Jose Pedro Varela', 'En Espera de despachar el envío', NULL, '55558115', '2024-11-17 19:06:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `size`
--

CREATE TABLE `size` (
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `size`
--

INSERT INTO `size` (`type`) VALUES
('L'),
('M'),
('S'),
('XL'),
('XXL');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `userCi` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `verificationCode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userCi`, `email`, `isAdmin`, `isVerified`, `userName`, `password`, `phone`, `verificationCode`) VALUES
('1', 'projectepicweb@gmail.com', 1, 1, 'Admin', '$2y$10$7w.qkpLc0Kg0wKr/x7HubuzXrTHUTW4GnWVzjEIKVtP8fA/pSBkkq', '093540768', '66dd3cd263a75'),
('12345678', 'fernando.ramos@example.com', 0, 1, 'fernandoramos', '$2y$10$EONCiAT5z3biEOtNdxTFGOgfY1cUPsY9w3Mo/UKJK0zwJxiY.XEmW', '0989012345', '6724292ec87c7'),
('23456789', 'martin.perez@example.com', 0, 1, 'martinperez', '$2y$10$UvwgPb5QUfR2p9ZiSbLcK.oqemGIt45JF0ZQbTP2RtfJE2nOu3gwy', '0981234567', '67242637a4f97'),
('34567890', 'sofia.gomez@example.com', 0, 1, 'sofiagomez', '$2y$10$C/yAsB2//IClJMak40uDt.V7/4agHhBvOqG6plSM3GPRCkjALNd9a', '0982345678', '672426840008e'),
('45678901', 'juan.fernandez@example.com', 0, 1, 'juanfernandez', '$2y$10$XgPq3eiPnMqv8ZgpKzOnWeQGU2eNbRBkG/WCZnVWbn9J3fFmeSRHS', '0983456789', '672426a711b88'),
('55558115', 'bas.gdmc@gmail.com', 0, 1, 'Lautaro', '$2y$10$aa078sPMs.znN/5.1Fu0z.mA8uz8s8KrqaN86rTgsB9N1rUCiJAIS', '097385962', '673a2990e354b'),
('56789012', 'carla.rodriguez@example.com', 0, 1, 'carlarodriguez', '$2y$10$s54PFmbNanF6JxmVq6dyze36PMDm5uvioSBJhRaZu5yJKpREM/ctC', '0984567890', '672426d70e20f'),
('67890123', 'luis.martinez@example.com', 0, 1, 'luismartinez', '$2y$10$p3mBTeNoI6FWNHpn8Ze5buAmdAIXOIomq8X7lGW6y.Lig60KyyM4O', '0985678901', '672426f76e46b'),
('78901234', 'maria.lopez@example.com', 0, 1, 'marialopez', '$2y$10$0WzodsQY/2HCbVeK1m33C.ZdCj.iI7bS8m3TzrRDiX4sQDzu/kkui', '0986789012', '672428c91a5f5'),
('89012345', 'pablo.sanchez@example.com', 0, 1, 'pablosanchez', '$2y$10$gzuj08iDZ8mt3sHh0EUbB.oWImxC3AfrpxC8g9Vz3r1ZlDA9M.NMq', '0987890123', '672428ec7abd6'),
('90123456', 'laura.garcia@example.com', 0, 1, 'lauragarcia', '$2y$10$/FmZvh1f/8yEyACuBuqHru5diS4t/JtBS0Vky1rw.WAvCrBt8KnEm', '0988901234', '6724291118e2c');

-- --------------------------------------------------------

--
-- Estructura para la vista `productsalesquantity`
--
DROP TABLE IF EXISTS `productsalesquantity`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `productsalesquantity`  AS SELECT count(`sp`.`productId`) AS `saleQuantity`, `p`.`productId` AS `productId`, `p`.`price` AS `price`, `p`.`stock` AS `stock`, `p`.`description` AS `description`, `p`.`extension` AS `extension`, `p`.`name` AS `name`, `p`.`color` AS `color` FROM (`saleproduct` `sp` join `product` `p` on(`p`.`productId` = `sp`.`productId`)) GROUP BY `p`.`productId` ORDER BY count(`sp`.`productId`) DESC ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `inquiry`
--
ALTER TABLE `inquiry`
  ADD PRIMARY KEY (`inquiryId`),
  ADD KEY `ciUsuario` (`userCi`);

--
-- Indices de la tabla `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`messageId`),
  ADD KEY `idConsulta` (`inquiryId`),
  ADD KEY `messageCi` (`userCI`) USING BTREE;

--
-- Indices de la tabla `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`offerId`) USING BTREE;

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productId`);

--
-- Indices de la tabla `productoffer`
--
ALTER TABLE `productoffer`
  ADD PRIMARY KEY (`productId`,`offerId`) USING BTREE,
  ADD KEY `offerId` (`offerId`);

--
-- Indices de la tabla `productsize`
--
ALTER TABLE `productsize`
  ADD PRIMARY KEY (`productId`,`sizeType`) USING BTREE,
  ADD KEY `tipoTalle` (`sizeType`);

--
-- Indices de la tabla `saleproduct`
--
ALTER TABLE `saleproduct`
  ADD PRIMARY KEY (`saleProductId`) USING BTREE,
  ADD KEY `idCompra` (`saleId`),
  ADD KEY `idProducto` (`productId`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`saleId`),
  ADD KEY `ciUsuario` (`userCi`);

--
-- Indices de la tabla `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`type`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userCi`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `inquiry`
--
ALTER TABLE `inquiry`
  MODIFY `inquiryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `message`
--
ALTER TABLE `message`
  MODIFY `messageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `offer`
--
ALTER TABLE `offer`
  MODIFY `offerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `saleproduct`
--
ALTER TABLE `saleproduct`
  MODIFY `saleProductId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `saleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inquiry`
--
ALTER TABLE `inquiry`
  ADD CONSTRAINT `inquiry_ibfk_1` FOREIGN KEY (`userCi`) REFERENCES `users` (`userCi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `mensaje_ci` FOREIGN KEY (`userCI`) REFERENCES `users` (`userCi`),
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`inquiryId`) REFERENCES `inquiry` (`inquiryId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productoffer`
--
ALTER TABLE `productoffer`
  ADD CONSTRAINT `productoffer_ibfk_1` FOREIGN KEY (`offerId`) REFERENCES `offer` (`offerId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productoffer_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productsize`
--
ALTER TABLE `productsize`
  ADD CONSTRAINT `productsize_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productsize_ibfk_2` FOREIGN KEY (`sizeType`) REFERENCES `size` (`type`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `saleproduct`
--
ALTER TABLE `saleproduct`
  ADD CONSTRAINT `saleproduct_ibfk_1` FOREIGN KEY (`saleId`) REFERENCES `sales` (`saleId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `saleproduct_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`userCi`) REFERENCES `users` (`userCi`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

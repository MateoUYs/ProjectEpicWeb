-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-10-2024 a las 16:18:37
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
  `userCi` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `offer`
--

CREATE TABLE `offer` (
  `offerId` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `discount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 1200, 50, 'Remera Oversize Black Washed - Spider', 'png', 'Remera Washed - Spider', '#000000'),
(2, 100, 20, 'Camisa casual', 'jpg', 'Camisa Azul', '#000000'),
(3, 150, 15, 'Pantalón de vestir', 'jpg', 'Pantalón Negro', 'black'),
(4, 75, 30, 'Camiseta deportiva', 'jpg', 'Camiseta Roja', 'red'),
(5, 120, 25, 'Chaqueta impermeable', 'jpg', 'Chaqueta Verde', 'green'),
(6, 80, 40, 'Sombrero de lana', 'jpg', 'Sombrero Gris', 'gray'),
(7, 90, 35, 'Bufanda de algodón', 'jpg', 'Bufanda Blanca', 'white'),
(8, 110, 10, 'Zapatos de cuero', 'jpg', 'Zapatos Marrones', 'brown'),
(9, 200, 5, 'Abrigo de invierno', 'jpg', 'Abrigo Negro', 'black'),
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
  `size` varchar(10) DEFAULT NULL,
  `offerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `saleId` int(11) NOT NULL,
  `isPaid` tinyint(1) DEFAULT NULL,
  `saleStatus` varchar(255) DEFAULT NULL,
  `trackingNumber` varchar(25) DEFAULT NULL,
  `userCi` varchar(255) DEFAULT NULL,
  `saleDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Estructura de tabla para la tabla `userfavoriteproduct`
--

CREATE TABLE `userfavoriteproduct` (
  `userCi` varchar(255) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
('55558115', 'bas.gdmc@gmail.com', 0, 1, 'Lautaro', '$2y$10$6NhtHZZkV18mI9I2.hEmVeXuwW.a37hhY7YmwJTIcjqtxQbfErmTi', '097385962', '66dd3cfe0c04a'),
('556', 'a@a', 0, 0, 'Lautaro', '$2y$10$rzhh6swpnq90hXojUy1KBO0Zfa0OqNWFKBeH5HkMhv0z62JoLxWvG', '097', '66dd3d20f3f58');

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
  ADD PRIMARY KEY (`saleProductId`,`productId`,`saleId`,`offerId`) USING BTREE,
  ADD KEY `idCompra` (`saleId`),
  ADD KEY `idProducto` (`productId`),
  ADD KEY `idOferta` (`offerId`);

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
-- Indices de la tabla `userfavoriteproduct`
--
ALTER TABLE `userfavoriteproduct`
  ADD PRIMARY KEY (`productId`,`userCi`),
  ADD KEY `ciUsuario` (`userCi`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userCi`),
  ADD UNIQUE KEY `email` (`email`);

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
  ADD CONSTRAINT `saleproduct_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `saleproduct_ibfk_3` FOREIGN KEY (`offerId`) REFERENCES `offer` (`offerId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`userCi`) REFERENCES `users` (`userCi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `userfavoriteproduct`
--
ALTER TABLE `userfavoriteproduct`
  ADD CONSTRAINT `userfavoriteproduct_ibfk_1` FOREIGN KEY (`userCi`) REFERENCES `users` (`userCi`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userfavoriteproduct_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

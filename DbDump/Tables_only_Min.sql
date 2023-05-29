-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: csit314
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `aid` int NOT NULL AUTO_INCREMENT,
  `Address` varchar(200) DEFAULT NULL,
  `Suburb` varchar(45) DEFAULT NULL,
  `Postcode` varchar(45) DEFAULT NULL,
  `Latitude` decimal(30,15) DEFAULT NULL,
  `Longitude` decimal(30,15) DEFAULT NULL,
  `userid` int DEFAULT NULL,
  PRIMARY KEY (`aid`),
  KEY `Id_idx` (`userid`),
  CONSTRAINT `Id` FOREIGN KEY (`userid`) REFERENCES `users` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `Fid` int NOT NULL AUTO_INCREMENT,
  `client_rating` varchar(45) DEFAULT NULL,
  `professional_rating` varchar(45) DEFAULT NULL,
  `client_feedback` varchar(500) DEFAULT NULL,
  `professional_feedback` varchar(500) DEFAULT NULL,
  `job_notes` varchar(500) DEFAULT NULL,
  `servid` int DEFAULT NULL,
  PRIMARY KEY (`Fid`),
  KEY `sid_idx` (`servid`),
  CONSTRAINT `sid` FOREIGN KEY (`servid`) REFERENCES `service_requests` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `membership`
--

DROP TABLE IF EXISTS `membership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membership` (
  `mid` int NOT NULL AUTO_INCREMENT,
  `membershipType` varchar(45) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`mid`),
  KEY `userid_idx` (`userId`),
  CONSTRAINT `refuid` FOREIGN KEY (`userId`) REFERENCES `users` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `Pid` int NOT NULL AUTO_INCREMENT,
  `PaymentAmount` int DEFAULT NULL,
  `PaymentType` varchar(45) DEFAULT NULL,
  `CardNo` bigint DEFAULT NULL,
  `CardExpiry` varchar(45) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`Pid`),
  KEY `userid_idx` (`userId`),
  CONSTRAINT `userid` FOREIGN KEY (`userId`) REFERENCES `users` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `service_requests`
--

DROP TABLE IF EXISTS `service_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_requests` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `request` varchar(45) DEFAULT NULL,
  `request_desc` varchar(500) DEFAULT NULL,
  `specialty` varchar(45) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `userid` int DEFAULT NULL,
  PRIMARY KEY (`sid`),
  KEY `user_idx` (`userid`),
  CONSTRAINT `user` FOREIGN KEY (`userid`) REFERENCES `users` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `First_Name` varchar(45) DEFAULT NULL,
  `Last_Name` varchar(45) DEFAULT NULL,
  `Phone_number` int DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `AccountType` varchar(45) DEFAULT NULL,
  `pSpecialty` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=952134486 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-29 13:47:51

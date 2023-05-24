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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (10,'8 Thornton Dr','Penrith','2750',-33.747153400000000,150.697124500000000,116211705),(11,'56-60 Condamine St','Campbelltown','2560',-34.073212900000000,150.820939000000000,766479142),(12,'Yanko Ave','Bronte','2024',-33.905173700000000,151.263146600000000,411091724),(13,'Ulana Ave','Halekulani','2262',-33.223619800000000,151.548751500000000,153897865),(14,'184-152 Illawarra Rd','Marrickville','2204',-33.908900400000000,151.157593000000000,122585235),(15,'15-11 Nerang St','Ryde','2112',-33.805624100000000,151.123776300000000,273298173),(16,'7-9 Termeil Pl','Flinders','2529',-34.576724500000000,150.848231600000000,563584524),(17,'12-40 Edward St','Charlestown','2290',-32.964287600000000,151.703730300000000,952134485),(18,'29-1 Ravenna St','Strathfield','2135',-33.883011800000000,151.076932000000000,342031921);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membership`
--

LOCK TABLES `membership` WRITE;
/*!40000 ALTER TABLE `membership` DISABLE KEYS */;
INSERT INTO `membership` VALUES (11,'Membership Subscription',116211705),(12,'Membership Subscription',766479142),(13,'Pay-On-Demand',411091724),(14,'Pay-On-Demand',153897865),(15,'Membership Subscription',122585235),(16,'Pay-On-Demand',273298173),(17,'Pay-On-Demand',563584524),(18,'Pay-On-Demand',952134485),(20,'Membership Subscription',342031921);
/*!40000 ALTER TABLE `membership` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (12,50,'Membership subscription payment',1587596351472568,'01/2025',116211705),(13,50,'Membership subscription payment',1568265896521576,'02/2026',766479142),(14,15,'Membership subscription payment',9552485635872574,'09/2026',411091724),(15,50,'Membership subscription payment',6584325475426985,'02/2025',153897865),(16,50,'Membership subscription payment',1257856354752578,'09/2025',122585235),(17,50,'Membership subscription payment',6852356878539875,'07/2027',273298173),(18,50,'Membership subscription payment',3584526887591527,'03/2026',563584524),(19,50,'Membership subscription payment',2578598635863152,'11/2024',952134485),(25,205,'Tradie service Payment',9552485635872578,'09/2026',411091724),(26,479,'Membership subscription payment',1523586587855965,'01/2025',342031921);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_requests`
--

LOCK TABLES `service_requests` WRITE;
/*!40000 ALTER TABLE `service_requests` DISABLE KEYS */;
INSERT INTO `service_requests` VALUES (3,'Set up new lighting','Set up new fluorescent lighting for rooms in my house','Electrician',NULL,116211705),(4,'Wooden fencing for front lawn','Install wooden fencing using pine wood. Add some carving decoration to the wooden fencing','Carpenter',NULL,766479142),(6,'Repair dented walls','Repair caved in and dented walls in master bedroom.','General Repair',NULL,153897865);
/*!40000 ALTER TABLE `service_requests` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (116211705,'Nick','Terryson',895365745,'NT@gmail.com','admin','Client',NULL),(122585235,'John','Henderson',854752635,'JH@outlook.com','pixieburst','Professional','Electrician'),(153897865,'Jasmine','Todd',486524585,'JT@outlook.com','myfavbish','Client',NULL),(273298173,'Damain ','Welwood',458784596,'DW@outlook.com','pass123','Professional','Plumber'),(342031921,'Cathy','Davidson',487525687,'CD@google.com','favpony','Client',NULL),(411091724,'Billy ','Burton',756248896,'BB@yahoo.com','passwd','Client',NULL),(563584524,'Merle','Jacobson',785625752,'MJ@outlook.com','axelvarance','Professional','Carpenter'),(766479142,'Karl','Ethans',652895152,'KE@yahoo.com','password','Client',NULL),(952134485,'Clare','Tenwood',426584875,'CT@outlook.com','chauncey','Professional','Landscaper');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-24 10:13:26

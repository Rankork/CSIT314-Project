CREATE TABLE IF NOT EXISTS `clients` (
  `Client_Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `Username` varchar(45) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `Account_Status` varchar(45) DEFAULT 'Active',
  PRIMARY KEY (`Client_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `professionals` (
  `Professional_Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `Username` varchar(45) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `Account_Status` varchar(45) DEFAULT 'Active',
  `Professional_Type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Professional_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `address` (
	`Address_Id` int NOT NULL AUTO_INCREMENT, 
    `Street_Address` varchar(200) DEFAULT NULL,
    `Suburb` varchar(45) DEFAULT NULL,
    `Postcode` int DEFAULT NULL, 
    `Latitude` decimal(30,15) DEFAULT NULL,
    `Longitude` decimal(30,15) DEFAULT NULL,
    `Client_Id` int NOT NULL,
    PRIMARY KEY (`Address_Id`),
    FOREIGN KEY (`Client_Id`) REFERENCES clients(`Client_Id`)

) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `membership` (
	`Member_Id` int NOT NULL AUTO_INCREMENT,
    `Membership_Type` varchar(45) DEFAULT NULL,
    `Client_Id` int DEFAULT NULL, 
    `Professional_Id` int DEFAULT NULL, 
    PRIMARY KEY (`Member_Id`),
    FOREIGN KEY (`Client_Id`) REFERENCES clients(`Client_Id`),
    FOREIGN KEY (`Professional_Id`) REFERENCES professionals (`Professional_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `service_request` (

	`Request_Id` int NOT NULL AUTO_INCREMENT,
    `Request_Type` varchar(45) NOT NULL, 
    `Request_Description` varchar(500) DEFAULT NULL,
    `Request_Status` varchar(45) DEFAULT NULL,
    `Request_Price` int NOT NULL,
    `Client_Id` int NOT NULL, 
    `Professional_Id` int NOT NULL,
    `Address_Id` int NOT NULL,
    PRIMARY KEY (`Request_Id`),
    FOREIGN KEY (`Client_Id`) REFERENCES clients(`Client_Id`),
    FOREIGN KEY (`Professional_Id`) REFERENCES professionals(`Professional_Id`),
    FOREIGN KEY (`Address_Id`) REFERENCES address(`Address_Id`)

) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `payment` (

	`Payment_Id` int NOT NULL AUTO_INCREMENT, 
    `Payment_Amount` int DEFAULT NULL, 
    /*Insert some sort of bank details here*/
    `Client_Id` int NOT NULL,
	`Professional_Id` int NOT NULL, 
    `Request_Id` int NOT NULL,
    PRIMARY KEY (`Payment_Id`),
    FOREIGN KEY (`Client_Id`) REFERENCES clients(`Client_Id`),
    FOREIGN KEY (`Professional_Id`) REFERENCES professionals(`Professional_Id`),
    FOREIGN KEY (`Request_Id`) REFERENCES service_request(`Request_Id`)

) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `ratings` (

	`Rating_Id` int NOT NULL AUTO_INCREMENT, 
    `Rating_Number` int DEFAULT NULL, 
    `Rating_Description` int DEFAULT NULL, 
    `Client_Id` int NOT NULL,
    `Professional_Id` int NOT NULL, 
    `Request_Id` int NOT NULL, 
    PRIMARY KEY (`Rating_Id`),
	FOREIGN KEY (`Client_Id`) REFERENCES clients(`Client_Id`),
    FOREIGN KEY (`Professional_Id`) REFERENCES professionals(`Professional_Id`),
	FOREIGN KEY (`Request_Id`) REFERENCES service_request(`Request_Id`)

) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ratings`;
DROP TABLE IF EXISTS `payment`;
DROP TABLE IF EXISTS `service_request`;
DROP TABLE IF EXISTS `membership`;
DROP TABLE IF EXISTS `address`;
DROP TABLE IF EXISTS `professionals`;
DROP TABLE IF EXISTS `clients`;

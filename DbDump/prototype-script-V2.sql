/*Prototype of next iteration of the database, please read the readme file on Github for further details*/

CREATE TABLE IF NOT EXISTS `clients` (
  `Client_Id` bigint NOT NULL AUTO_INCREMENT, /*Clients are assigned an Id*/
  `Name` varchar(100) NOT NULL, /*Important to have names for clients*/
  `Username` varchar(50) DEFAULT NULL, /*Username could be manually set or automatically generated*/
  `Email` varchar(100) NOT NULL, /*Email details are required, such as for sign-in*/
  `Password` varchar(32) DEFAULT NULL, /*Password in this case is not salted and hashed, this could be done in a future iteration*/
  /*Password limited to 32 char's as standard across most sites*/
  `Account_Status` varchar(20) DEFAULT 'Active', /*Accounts will be in use by default, therefore status should be Active*/
  PRIMARY KEY (`Client_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `professionals` (
  `Professional_Id` bigint NOT NULL AUTO_INCREMENT, /*Professionals are assigned an Id*/
  `Name` varchar(100) NOT NULL, /*Important to have names for professionals*/
  `Username` varchar(50) DEFAULT NULL, /*Username could be manually set or automatically generated*/
  `Email` varchar(100) NOT NULL, /*Email details are required, such as for sign-in*/
  `Password` varchar(32) DEFAULT NULL, /*Password in this case is not salted and hashed, this could be done in a future iteration*/
  /*Password limited to 32 char's as standard across most sites*/
  `Account_Status` varchar(20) DEFAULT 'Active', /*Accounts will be in use by default, therefore status should be Active*/
  `Professional_Type` varchar(50) DEFAULT NULL, /*There will be different types of professionals, this info needs to be stored*/
  PRIMARY KEY (`Professional_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `address` (
	`Address_Id` bigint NOT NULL AUTO_INCREMENT, /*Addresses are assigned an Id*/
    `Street_Address` varchar(200) DEFAULT NULL, /*Example: 123 Example Street*/
    `Suburb` varchar(50) DEFAULT NULL, /*Suburb of the Address*/
    `Postcode` int DEFAULT NULL, /*Postcode of the address*/
    `Latitude` decimal(30,15) DEFAULT NULL, /*Used in the 50km radius calculations*/
    `Longitude` decimal(30,15) DEFAULT NULL, /*Used in the 50km radius calculations*/
    `Client_Id` bigint NOT NULL,
    PRIMARY KEY (`Address_Id`),
    FOREIGN KEY (`Client_Id`) REFERENCES clients(`Client_Id`)

) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `membership` (
	`Member_Id` bigint NOT NULL AUTO_INCREMENT, /*Memberships are assigned an Id*/
    `Membership_Type` varchar(25) DEFAULT NULL, /*Subscription/On Demand etc*/
    `Client_Id` bigint DEFAULT NULL, /*Clients can have a membership, therefore we need their ID in this table*/
    `Professional_Id` bigint DEFAULT NULL, /*Professionals can have a membership, therefore we need their ID in this table*/
    PRIMARY KEY (`Member_Id`),
    FOREIGN KEY (`Client_Id`) REFERENCES clients(`Client_Id`),
    FOREIGN KEY (`Professional_Id`) REFERENCES professionals (`Professional_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `service_request` (

	`Request_Id` bigint NOT NULL AUTO_INCREMENT, /*Service Requests are assigned an Id*/
    `Request_Type` varchar(50) NOT NULL, /*This sets the type of request being made, such as "clean gutters"*/
    `Request_Description` varchar(500) DEFAULT NULL, /*A more detailed description of the issue (if one is provided)*/
    `Request_Status` varchar(10) DEFAULT NULL, /*Pending (Submitted but not Accepted), Accepted, Completed, etc*/
    `Request_Price` int NOT NULL,
    `Client_Id` bigint NOT NULL, /*Links to the Client who submitted the request*/
    `Professional_Id` bigint DEFAULT NULL, /*Request initially has no professional attached, therefore default NULL*/
    `Address_Id` int NOT NULL, /*Attaches address info to a service request*/
    PRIMARY KEY (`Request_Id`),
    FOREIGN KEY (`Client_Id`) REFERENCES clients(`Client_Id`),
    FOREIGN KEY (`Professional_Id`) REFERENCES professionals(`Professional_Id`),
    FOREIGN KEY (`Address_Id`) REFERENCES address(`Address_Id`)

) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `payment` (

	`Payment_Id`bigint NOT NULL AUTO_INCREMENT, /*Payments are assigned an Id*/
    `Payment_Type` varchar(50) NOT NULL, /*Service Request or Membership etc*/
    `Payment_Description` varchar(500) DEFAULT NULL, /*Extra description regarding payment if necessary, such as a reference number or details etc.*/
    `Payment_Amount` int DEFAULT NULL, /*Amount of money being paid*/
    `Card_Number` varchar(16) DEFAULT NULL, /*Card details for payment*/
    /*16 is char limit, as most credit cards tend to be in the range of 12 - 16 digits, with Australian cards being 16 digits*/
    `Card_Expiry` varchar(5) DEFAULT NULL, /*Card expiry dates often follow a MM/YY format, therefore 5 characters*/
    `Card_CVV` varchar(4) DEFAULT NULL, /*Card Verification Value, always 3 digits on Australian cards, but can be 4 on others*/ 
    `Client_Id` bigint DEFAULT NULL, /*Payments are attached to the client responsible for the payment*/
	`Professional_Id` bigint DEFAULT NULL, /*Payments are attached to the professional receiving the payment, if for a service request*/
    `Request_Id` bigint DEFAULT NULL, /*The service request a payment is attached to (assuming service request)*/
    PRIMARY KEY (`Payment_Id`),
    FOREIGN KEY (`Client_Id`) REFERENCES clients(`Client_Id`),
    FOREIGN KEY (`Professional_Id`) REFERENCES professionals(`Professional_Id`),
    FOREIGN KEY (`Request_Id`) REFERENCES service_request(`Request_Id`)

) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `ratings` (

	`Rating_Id` bigint NOT NULL AUTO_INCREMENT, /*Ratings are assigned an Id*/
    `Rating_Number` int DEFAULT NULL, /*Rating such as 1 star, or 5 stars*/
    `Rating_Description` varchar(500) DEFAULT NULL, /*Optional ability to add a description to their rating*/
    `Client_Id` bigint NOT NULL, /*Ratings are attached to the users who submitted them*/
    `Professional_Id` bigint NOT NULL, /*Ratings are linked to the specific professional it is for*/
    `Request_Id` bigint NOT NULL, /*Rating linked to a specific service Request*/
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

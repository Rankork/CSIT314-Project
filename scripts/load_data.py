import time

import mysql.connector
import dotenv
import json
import os
import sys

if __name__ == '__main__':
    create_clients_table = """
        CREATE TABLE IF NOT EXISTS clients (
        Client_Id BIGINT NOT NULL AUTO_INCREMENT,
        Name varchar(45) DEFAULT NULL,
        Username varchar(45) DEFAULT NULL,
        Email varchar(100) DEFAULT NULL,
        Password varchar(45) DEFAULT NULL,
        Account_Status varchar(45) DEFAULT 'Active',
        PRIMARY KEY (Client_Id)
    )"""

    create_professionals_table = """
        CREATE TABLE IF NOT EXISTS professionals (
        Professional_Id BIGINT NOT NULL AUTO_INCREMENT,
        Name varchar(45) DEFAULT NULL,
        Username varchar(45) DEFAULT NULL,
        Email varchar(100) DEFAULT NULL,
        Password varchar(45) DEFAULT NULL,
        Account_Status varchar(45) DEFAULT 'Active',
        Professional_Type varchar(45) DEFAULT NULL,
        PRIMARY KEY (Professional_Id)
    )"""

    create_address_table = """
        CREATE TABLE IF NOT EXISTS address (
	    Address_Id BIGINT NOT NULL AUTO_INCREMENT, 
        Street_Address varchar(200) DEFAULT NULL,
        Suburb varchar(45) DEFAULT NULL,
        Postcode int DEFAULT NULL,
        State varchar(45) DEFAULT NULL,
        Latitude decimal(30,15) DEFAULT NULL,
        Longitude decimal(30,15) DEFAULT NULL,
        Client_Id BIGINT NOT NULL,
        PRIMARY KEY (`Address_Id`),
        FOREIGN KEY (`Client_Id`) REFERENCES clients(Client_Id)
    )"""

    create_membership_table = """
        CREATE TABLE IF NOT EXISTS membership (
	    Member_Id BIGINT NOT NULL AUTO_INCREMENT,
        Membership_Type varchar(45) DEFAULT NULL,
        Client_Id BIGINT DEFAULT NULL, 
        Professional_Id BIGINT DEFAULT NULL,
        NOT_NULL_CONSTRAINT BIGINT GENERATED ALWAYS AS (coalesce(Client_Id, Professional_Id)) VIRTUAL NOT NULL,
        PRIMARY KEY (Member_Id),
        FOREIGN KEY (Client_Id) REFERENCES clients(Client_Id),
        FOREIGN KEY (Professional_Id) REFERENCES professionals (Professional_Id)
    )"""

    create_service_request_table = """
        CREATE TABLE IF NOT EXISTS service_request (
	    Request_Id BIGINT NOT NULL AUTO_INCREMENT,
        Request_Type varchar(45) NOT NULL, 
        Request_Description varchar(500) DEFAULT NULL,
        Request_Status varchar(45) DEFAULT NULL,
        Request_Price int NOT NULL,
        Client_Id BIGINT DEFAULT NULL, 
        Professional_Id BIGINT DEFAULT NULL,
        Address_Id BIGINT NOT NULL,
        NOT_NULL_CONSTRAINT BIGINT GENERATED ALWAYS AS (coalesce(Client_Id, Professional_Id)) VIRTUAL NOT NULL,
        PRIMARY KEY (Request_Id),
        FOREIGN KEY (Client_Id) REFERENCES clients(Client_Id),
        FOREIGN KEY (Professional_Id) REFERENCES professionals(Professional_Id),
        FOREIGN KEY (Address_Id) REFERENCES address(Address_Id)
    )"""

    create_payment_table = """
        CREATE TABLE IF NOT EXISTS payment (
	    Payment_Id BIGINT NOT NULL AUTO_INCREMENT, 
	    Payment_Type varchar(45) NOT NULL, 
        Payment_Amount int DEFAULT NULL, 
        Client_Id BIGINT DEFAULT NULL,
	    Professional_Id BIGINT DEFAULT NULL, 
        Request_Id BIGINT DEFAULT NULL,
        Card_Number varchar(45) DEFAULT NULL,
        Card_Expiry varchar(45) DEFAULT NULL,
        NOT_NULL_CONSTRAINT BIGINT GENERATED ALWAYS AS (coalesce(Client_Id, Professional_Id)) VIRTUAL NOT NULL,
        PRIMARY KEY (Payment_Id),
        FOREIGN KEY (Client_Id) REFERENCES clients(Client_Id),
        FOREIGN KEY (Professional_Id) REFERENCES professionals(Professional_Id),
        FOREIGN KEY (Request_Id) REFERENCES service_request(Request_Id)
    )"""

    create_ratings_table = """
        CREATE TABLE IF NOT EXISTS ratings (
	    Rating_Id BIGINT NOT NULL AUTO_INCREMENT, 
        Rating_Number int DEFAULT NULL, 
        Rating_Description int DEFAULT NULL, 
        Client_Id BIGINT NOT NULL,
        Professional_Id BIGINT NOT NULL, 
        Request_Id BIGINT NOT NULL, 
        PRIMARY KEY (Rating_Id),
	    FOREIGN KEY (Client_Id) REFERENCES clients(Client_Id),
        FOREIGN KEY (Professional_Id) REFERENCES professionals(Professional_Id),
	    FOREIGN KEY (Request_Id) REFERENCES service_request(Request_Id)
    )"""

    create_tables = [
        create_clients_table,
        create_professionals_table,
        create_address_table,
        create_membership_table,
        create_service_request_table,
        create_payment_table,
        create_ratings_table
    ]

    cleanup_tables = [
        "DROP TABLE IF EXISTS ratings",
        "DROP TABLE IF EXISTS payment",
        "DROP TABLE IF EXISTS service_request",
        "DROP TABLE IF EXISTS membership",
        "DROP TABLE IF EXISTS address",
        "DROP TABLE IF EXISTS professionals",
        "DROP TABLE IF EXISTS clients"
    ]

    # If new tables are needed, they must have a cleanup entry added,
    # also a create table query must be generated and placed above

    SLEEP_TIME = 0.5
    DATA_DIR = "./data"
    JSON_POSTFIX = ".json"
    POSTCODES_POSTFIX = "postcodes.json"

    db_data = {}
    backend_env = dotenv.dotenv_values("./env/backend.env")
    connection = mysql.connector.MySQLConnection()

    while not connection.is_connected():
        try:
            connection = mysql.connector.connect(host=backend_env["DB_HOSTNAME"],
                                                 database=backend_env["DB_INTERNAL_DB"],
                                                 user=backend_env["DB_USER"],
                                                 password=backend_env["DB_PASS"],
                                                 auth_plugin='mysql_native_password')
        except Exception as error:
            print(f"Failed to connect to MySQL: {error}")
            print(f"Sleeping for {SLEEP_TIME} seconds")
            time.sleep(SLEEP_TIME)

    mysql = connection.cursor()

    mysql.execute("SET FOREIGN_KEY_CHECKS=0")

    for drop_table in cleanup_tables:
        mysql.execute(drop_table)

    for create_table in create_tables:
        mysql.execute(create_table)

    for root, subdirs, files in os.walk(DATA_DIR):
        for file in files:
            if JSON_POSTFIX not in file:
                continue
            if POSTCODES_POSTFIX in file:
                continue
            with open(os.path.join(root, file), "r") as f:
                db_data[file.replace(JSON_POSTFIX, "")] = json.load(f)

    try:
        for table_name, table_data in db_data.items():
            table_field_names = list(table_data[0].keys())
            table_field_data = [tuple(data.values()) for data in table_data]

            table_field_names_comma = ", ".join(table_field_names)
            table_place_holder_comma = ", ".join(['%s'] * len(table_field_names))

            insert_query = f"INSERT INTO {table_name} ({table_field_names_comma}) VALUES ({table_place_holder_comma})"
            mysql.executemany(insert_query, table_field_data)
            print(f"[*] Loaded {len(table_field_data)} rows into {table_name} table")
    except Exception as error:
        print(f"[!] Error occurred while loading data into MySQL: {error}")
        exit(1)

    mysql.execute("SET FOREIGN_KEY_CHECKS=1")
    connection.commit()

    exit(0)
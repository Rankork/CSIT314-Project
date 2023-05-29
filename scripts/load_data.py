import time

import mysql.connector
import dotenv
import json
import os
import sys

if __name__ == '__main__':
    create_users_table = """
        CREATE TABLE IF NOT EXISTS users (
        Id BIGINT NOT NULL AUTO_INCREMENT,
        First_Name varchar(45) DEFAULT NULL,
        Last_Name varchar(45) DEFAULT NULL,
        Phone_number BIGINT DEFAULT NULL,
        Email varchar(100) DEFAULT NULL,
        Password varchar(45) DEFAULT NULL,
        AccountType varchar(45) DEFAULT NULL,
        pSpecialty varchar(45) DEFAULT NULL,
        PRIMARY KEY (Id)
    )"""

    create_address_table = """
        CREATE TABLE IF NOT EXISTS address (
        aid BIGINT NOT NULL AUTO_INCREMENT,
        Address varchar(200) DEFAULT NULL,
        Suburb varchar(45) DEFAULT NULL,
        Postcode varchar(45) DEFAULT NULL,
        Latitude decimal(30,15) DEFAULT NULL,
        Longitude decimal(30,15) DEFAULT NULL,
        userid BIGINT DEFAULT NULL,
        PRIMARY KEY (aid),
        KEY Id_idx (userid),
        CONSTRAINT Id FOREIGN KEY (userid) REFERENCES users (Id)
    )"""

    create_membership_table = """
        CREATE TABLE IF NOT EXISTS membership (
        mid BIGINT NOT NULL AUTO_INCREMENT,
        membershipType varchar(45) DEFAULT NULL,
        userId BIGINT DEFAULT NULL,
        PRIMARY KEY (mid),
        KEY userid_idx (userId),
        CONSTRAINT refuid FOREIGN KEY (userId) REFERENCES users (Id)
    )"""

    create_service_requests_table = """
        CREATE TABLE IF NOT EXISTS service_requests (
        sid BIGINT NOT NULL AUTO_INCREMENT,
        request varchar(45) DEFAULT NULL,
        request_desc varchar(500) DEFAULT NULL,
        specialty varchar(45) DEFAULT NULL,
        price int DEFAULT NULL,
        userid BIGINT DEFAULT NULL,
        PRIMARY KEY (sid),
        KEY user_idx (userid),
        CONSTRAINT user FOREIGN KEY (userid) REFERENCES users (`Id`)
    )"""

    create_payment_table = """
        CREATE TABLE IF NOT EXISTS payment (
        Pid BIGINT NOT NULL AUTO_INCREMENT,
        PaymentAmount int DEFAULT NULL,
        PaymentType varchar(45) DEFAULT NULL,
        CardNo BIGINT DEFAULT NULL,
        CardExpiry varchar(45) DEFAULT NULL,
        userId BIGINT DEFAULT NULL,
        PRIMARY KEY (Pid),
        KEY userid_idx (userId),
        CONSTRAINT userid FOREIGN KEY (userId) REFERENCES users (Id)
    )"""

    create_feedback_table = """
        CREATE TABLE IF NOT EXISTS feedback (
        Fid BIGINT NOT NULL AUTO_INCREMENT,
        client_rating varchar(45) DEFAULT NULL,
        professional_rating varchar(45) DEFAULT NULL,
        client_feedback varchar(500) DEFAULT NULL,
        professional_feedback varchar(500) DEFAULT NULL,
        job_notes varchar(500) DEFAULT NULL,
        servid BIGINT DEFAULT NULL,
        PRIMARY KEY (Fid),
        KEY sid_idx (servid),
        CONSTRAINT sid FOREIGN KEY (servid) REFERENCES service_requests (sid)
    )"""

    create_tables = [
        create_users_table,
        create_address_table,
        create_membership_table,
        create_service_requests_table,
        create_payment_table,
        create_feedback_table
    ]

    cleanup_tables = [
        "DROP TABLE IF EXISTS feedback",
        "DROP TABLE IF EXISTS payment",
        "DROP TABLE IF EXISTS service_requests",
        "DROP TABLE IF EXISTS membership",
        "DROP TABLE IF EXISTS address",
        "DROP TABLE IF EXISTS users"
    ]

    # If new tables are needed, they must have a cleanup entry added,
    # also a create table query must be generated and placed above
    
    # changed paths to fit windows 10 
    # Ali --> Ubuntu Linux, Min --> Windows 10

    SLEEP_TIME = 0.5
    DATA_DIR = "D:\Coding Workspaces\DatabaseTest\data"
    JSON_POSTFIX = ".json"
    POSTCODES_POSTFIX = "postcodes.json"

    db_data = {}
    backend_env = dotenv.dotenv_values("D:\Coding Workspaces\DatabaseTest\env\\backend.env")
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
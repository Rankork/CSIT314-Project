import Express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

const env_file = path.join(process.cwd(), "../", "env/", "backend.env");
console.log("ENV File: " + env_file.toString());

// Load environment vars from .env into process environment
dotenv.config({path: env_file});

const app = Express()
app.use(cors())
app.use(Express.json())

// -------------- Database Connection -------------------------

// Database Details for connection string
const db = mysql.createPool({
    connectionLimit: 10,
    waitForConnections: true,
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, // default password for root is password
    database: process.env.DB_INTERNAL_DB
});

// Test MySQL
const query_mysql = function (query, cb) {
    db.getConnection(function (err, connection) {
        if (err) {
            cb(err, null);
        } else {
            connection.query(query, function (err, rows) {
                connection.release();
                cb(err, rows);
            });
        }
    });
};

// API requests
// "/" is like root directory in linux
app.get("/", (req, res) => { // request and response
     res.json("Is this connecting to SQL server")
})

// points to students table
app.get("/students", (req,res) => {
    const query = "SELECT * FROM students" // R from CRUD
    query_mysql(query,(err, data) => { // return error and data
        if(err) {
            return res.json(err)
        }
        else {
            return res.json(data)
        }
    })
})

app.listen(process.env.BACKEND_PORT, () => {
    console.log("Backend listening on " + process.env.BACKEND_PORT) // NOTE: prints to console
})
import Express from "express";
import mysql from "mysql";
import cors from "cors";

const app = Express()
app.use(cors())
app.use(Express.json())

// -------------- Database Connection -------------------------

// Database Details for connection string
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"desolation99", // default password for root is password
    database:"test"
})

// Connect to MySQL
// API requests
// "/" is like root directory in linux
app.get("/", (req,res) => { // request and response
     res.json("Is this connecting to SQL server")
})

// points to students table
app.get("/students", (req,res) => {
    const query = "SELECT * FROM students" // R from CRUD
    db.query(query,(err,data) => { // return error or data
        if(err)
        {
            return res.json(err)
        }
        else
        {
            return res.json(data)
        }
    })
})

app.listen(8800, () =>{
    console.log("Connected to backend! Not sure about MySQL") // NOTE: prints to console
})
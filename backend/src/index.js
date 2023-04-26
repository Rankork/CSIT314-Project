import Express, { Router } from "express";
//import mysql2 from "mysql2";
import mysql from "mysql"
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import bodyparser from "body-parser"
import session from "express-session"
import seedrandom from "seedrandom"

const env_file = path.join(process.cwd(), "../", "env/", "backend.env");
console.log("ENV File: " + env_file.toString());

// Load environment vars from .env into process environment
dotenv.config({path: env_file});

const app = Express()
app.use(cors())
app.use(Express.json())

// Use body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(
    session({
      key: process.env.SESSION_KEY,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        expires: 60 * 60 * 24,
      },
    })
  );


// -------------- Database Connection -------------------------
// Database Details for connection string
const db = mysql.createConnection({
    connectionLimit: 10,
    waitForConnections: true,
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, // default password for root is password
    database: process.env.DB_INTERNAL_DB
})


// API requests
// "/" is like root directory in linux
app.get("/", (req, res) => { // request and response
     res.json("Is this connecting to SQL server")
})

// Handle logout
app.get("http://localhost:3000/logout", (req, res) => {
    // Session destroy on logout
    req.session.destroy((err) => {
      if (err) {
        console.error("Fatal error occurred when destroying session", err);
        return res.status(500).json({ success: false, message: "Logout failed" });
      }
      else
      {
        return res.status(200).json({ success: true, message: "Successful logout" });
      }
    });
});

// points to users table (LOGIN functionality)
app.post("/users", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM users WHERE Email = ? AND Password = ?", [email, password], 
        (err, result) => {
            if(err){
                //req.setEncoding({err: err});
            }else{
                if(result.length > 0){
                    //req.session.userId = result[0].Id;
                    res.status(200).send(result) // handle with OK HTTP status code 
                    //res.json({ success: true, data: result });
                }
                else{
                    res.send({message: "WRONG USERNAME OR PASSWORD!"})
                }
            }
        }
    )
})

// change user id to fit figma prototype
let seedVal = Math.floor(Math.random() * (999999999 - 1 + 1)) + 1;
let range = seedrandom(seedVal);

// Test insert 
app.post("/users/new", (req, res) => {
  const id = Math.floor(range() * (999999999 - 100000000 + 1)) + 100000000;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  
  db.query("INSERT INTO users (Id, Name, Email, Password) VALUES (?, ?, ?, ?)", [id, name, email, password], 
      (err, result) => {
          if(err){
              console.log(err);
              res.status(500).send({message: "Fatal error: Insert operation failed"});
          } else {
              console.log("New user inserted:", name, email);
              res.status(200).send({message: "Data successfully inserted"});
          }
      }
  )
})

app.listen(process.env.BACKEND_PORT, () => {
    console.log("Backend listening on " + process.env.BACKEND_PORT) // NOTE: prints to console
})
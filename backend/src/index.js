import Express, { Router } from "express";
//import mysql2 from "mysql2";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import bodyparser from "body-parser";
import session from "express-session";
import seedrandom from "seedrandom";

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

// ===== Client ========

// points to users table (LOGIN functionality)
app.post("/users", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM users WHERE Email = ? AND Password = ?", [email, password], 
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                if(result.length > 0){
                    res.status(200).send(result) // handle with OK HTTP status code 
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

// Test insert (Register)
app.post("/users/new", (req, res) => {
  const id = Math.floor(range() * (999999999 - 100000000 + 1)) + 100000000;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phonenumber = req.body.phonenumber
  const email = req.body.email;
  const password = req.body.password;
  const accountType = req.body.accountType;
  console.log(accountType);
  db.query("INSERT INTO users (Id, First_Name, Last_Name, Phone_number, Email, Password, AccountType) VALUES (?, ?, ?, ?, ?, ?, ?)", [id, firstname, lastname, phonenumber, email, password, accountType], 
      (err, result) => {
          if(err){
              console.log(err);
              res.status(500).send({message: "Fatal error: Insert operation failed"});
          } else {
              console.log("New user inserted");
              res.status(200).send({message: "Data successfully inserted"});
          }
      }
  )
})

// For payment and billing
app.post("/moredetails", (req, res) => {
    const cardNo = req.body.cardNo;
    console.log(req.body.membershipType); // Testing --> need to handle insertion into multiple tables for membership payment
    const memType = req.body.membershipType;
    const id = req.body.userId;
    const cardExp = req.body.cardexpiry;
    const Address = req.body.address;
    const Suburb = req.body.suburb;
    const Postcode = req.body.postcode;

    let fulladdr = Address + " " + Suburb + " " + Postcode;
    const gmapapiURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fulladdr)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    fetch(gmapapiURL)
        .then(response => response.json())
        .then(data => {
            const location = data.results[0].geometry.location;
            const latitude = location.lat;
            const longitude = location.lng;
            console.log(latitude);
            console.log(longitude);

            // Address Table
            db.query("INSERT INTO address (Address, Suburb, Postcode, Latitude, Longitude, userid) VALUES (?, ?, ?, ?, ?, ?)", [Address, Suburb, Postcode, latitude, longitude, id], // Handle for lat and long values 
            (err, result) => {
                if(err){
                    console.log(err);
                    //res.status(500).send({message: "Fatal error: Insert operation failed"}); // Prevent errors (can only send response once)
                } else {
                    console.log("New Address provided");
                    //res.status(200).send({message: "Data successfully inserted"}); // Prevent errors (can only send response once)
                } 
            }
        )
    })
    .catch(error => console.error(error));

    // Payment Table
    db.query("INSERT INTO payment (PaymentAmount, PaymentType, CardNo, CardExpiry, userId) VALUES (?, ?, ?, ?, ?)", [479, "Membership subscription payment", cardNo, cardExp, id],  // Need to change paymentamount based on Subscription type
        (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({message: "Fatal error: Insert operation failed"});
            } else {
                console.log("New Payment made");
                res.status(200).send({message: "Data successfully inserted"});
            }
        }
    )

    // Membership Table
    db.query("INSERT INTO membership (membershipType, userId) VALUES (?, ?)", [memType, id], 
        (err, result) => {
            if(err){
                console.log(err);
                //res.status(500).send({message: "Fatal error: Insert operation failed"}); // Prevent errors (can only send response once)
            } else {
                console.log("New Member");
                //res.status(200).send({message: "Data successfully inserted"}); // Prevent errors (can only send response once)
            }
        }
    )
  })


  // for service request tasks
  app.post("/service_requests", (req, res) => {
        const task = req.body.task;
        const specialty = req.body.specialty;
        const task_desc = req.body.task_description;
        const id = req.body.userId;
        // service_requests table
        db.query("INSERT INTO service_requests (request, request_desc, specialty, userid) VALUES (?, ?, ?, ?)", [task, task_desc, specialty, id],  // Need to change paymentamount based on Subscription type
        (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({message: "Fatal error: Insert operation failed"});
            } else {
                console.log("New Payment made");
                res.status(200).send({message: "Data successfully inserted"});
            }
        }
    )

})

// retrieve request by userId
app.get("/servreq/:userId", (req,res) => {
    const userId = req.params.userId;
    db.query(`SELECT sid, request, specialty FROM service_requests WHERE userid = ${userId}`,
        (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({message: "Fatal error: SELECT error"});
            }else{
                res.status(200).send(result); // GET always need to pass data to frontend from backend
            }
        }
    )
})

app.get("/locationdetails/:userId",  (req,res) => { // ===== Both Client and Professional ========
    const userId = req.params.userId;
    db.query(`SELECT 
    u.Id, 
    a.latitude, 
    a.longitude
    FROM Users u
    INNER JOIN Address a ON u.id = a.userid
    WHERE u.Id = ${userId}`,
        (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({message: "Fatal error: SELECT error"});
            }
            else{
                res.status(200).send(result); // GET always need to pass data to frontend from backend
            }
        }
    )
})


// retrieve professional for client
app.get("/professional", (req,res) => {
    // client lat and long here for calcuation (within 50 km radius)
    const clat = req.query.clat; // This is the clat=${cLat} for clat (query) not the variable name of const cLat
    const clng = req.query.clng;
    console.log(clat);
    console.log(clng);

    //select only professionals here =========== Client Side only =============
    db.query(`SELECT 
    u.Id, 
    CONCAT(u.First_name, ' ', u.Last_name) AS name, 
    a.Suburb, 
    u.pSpecialty, 
    u.Phone_number,
    a.Latitude, 
    a.Longitude
    FROM users u
    INNER JOIN address a ON u.id = a.userid
    WHERE u.AccountType = 'Professional'`,
        (err, Resultdata) => {
            if(err){
                console.log(err);
                res.status(500).send({message: "Fatal error: SELECT error"});
            }
            else{
                const resultfordistance = Resultdata.filter((res) => {
                    const tLat = res.Latitude;
                    const tLng = res.Longitude;
                    console.log("lat for tradie", tLat);
                    console.log("long for tradie", tLng);

                    // calculate distance between 2 locations (lat and long)
                    //const checkdistancekm = distanceonsphere(clat,clng,tLat,tLng);

                    const diffLat = (tLat * (Math.PI/180)) - (clat* (Math.PI/180));
                    const diffLon = (tLng * (Math.PI/180)) - (clng* (Math.PI/180));
                    const a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) + Math.cos(clat * (Math.PI/180)) * Math.cos(tLat * (Math.PI/180)) * Math.sin(diffLon/2) * Math.sin(diffLon/2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    const checkdistancekm = 6371 * c;

                    return checkdistancekm <= 50;
                });
                res.status(200).send(resultfordistance); // GET always need to pass data to frontend from backend
            }
        }
    )
})

// retrieve professional for client
app.get("/servicerequests", (req,res) => {
    // client lat and long here for calcuation (within 50 km radius)
    const plat = req.query.plat; // This is the clat=${cLat} for clat (query) not the variable name of const cLat
    const plng = req.query.plng;
    console.log(plat);
    console.log(plng);

    //select only service requests here =========== Professional Side only =============
    db.query(`SELECT 
	u.Id , 
    CONCAT(u.First_name, ' ', u.Last_name) AS name, 
    a.Suburb, 
    CONCAT(a.Address,',', a.Suburb,',',a.Postcode) AS full_address,
    u.Phone_number,
    a.Latitude, 
    a.Longitude,
    s.sid,
    s.request,
    s.request_desc,
    s.specialty 
    FROM users u
    INNER JOIN address a ON u.id = a.userid
    INNER JOIN service_requests s ON a.userid = s.userid
    WHERE u.AccountType = 'Client'`,
        (err, Resultdata) => {
            if(err){
                console.log(err);
                res.status(500).send({message: "Fatal error: SELECT error"});
            }
            else{
                const resultfordistance = Resultdata.filter((res) => {
                    const cLat = res.Latitude;
                    const cLng = res.Longitude;
                    console.log("lat for client", cLat);
                    console.log("long for client", cLng);

                    // calculate distance between 2 locations (lat and long)
                    //const checkdistancekm = distanceonsphere(plat,plng,cLat,cLng);
                    const diffLat = (cLat * (Math.PI/180)) - (plat* (Math.PI/180));
                    const diffLon = (cLng * (Math.PI/180)) - (plng* (Math.PI/180));
                    const a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) + Math.cos(plat * (Math.PI/180)) * Math.cos(cLat * (Math.PI/180)) * Math.sin(diffLon/2) * Math.sin(diffLon/2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    const checkdistancekm = 6371 * c;

                    return checkdistancekm <= 50;
                });
                res.status(200).send(resultfordistance); // GET always need to pass data to frontend from backend
            }
        }
    )
})


// handle payment to tradie
app.post("/tpayment", (req, res) => {
    const cardNo = req.body.cardNo;
    const id = req.body.userId;
    const cardExp = req.body.cardexpiry;
    const price = req.body.reqprice;
    // Payment Table
    db.query("INSERT INTO payment (PaymentAmount, PaymentType, CardNo, CardExpiry, userId) VALUES (?, ?, ?, ?, ?)", [price, "Tradie service Payment", cardNo, cardExp, id],  // Need to change paymentamount based on Subscription type
        (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({message: "Fatal error: Insert operation failed"});
            } else {
                console.log("New Payment made");
                res.status(200).send({message: "Data successfully inserted"});
            }
        }
    )
})

// set price for service request (Tradie)
app.post("/acceptservreq", (req, res) => {
        const price = req.body.price;
        const servreq = req.body.acceptreq;
        db.query(`UPDATE service_requests SET price = ${price} WHERE request = '${servreq}'`,  // NOTE: string in '' or ""
        (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({message: "Fatal error: Insert operation failed"});
            } else {
                console.log("New Payment made");
                res.status(200).send({message: "Data successfully inserted"});
            }
        }
    )
})

// client rating
app.post("/clientratestradie", (req, res) => {
    const Feedback = req.body.feedback;
    const Rating = req.body.rating;
    const sid = req.body.sid;
    db.query("INSERT INTO feedback (professional_rating, professional_feedback, servid) VALUES (?, ?, ?)", [Rating, Feedback, sid],  // NOTE: string in '' or ""
    (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({message: "Fatal error: Insert operation failed"});
        } else {
            console.log("New Payment made");
            res.status(200).send({message: "Data successfully inserted"});
        }
    }
)
})

// professional rating
app.post("/tradieratesclient",  (req,res) => {
    const Feedback = req.body.feedback;
    const Jobnotes = req.body.jobnotes;
    const Rating = req.body.rating;
    const sid = req.body.sid;
     db.query(`UPDATE feedback 
               SET client_rating = ${Rating},
               client_feedback = '${Feedback}',
               job_notes = '${Jobnotes}'
               WHERE servid = ?`, [sid], 
     (err, result) => {
         if(err){
             console.log(err);
             res.status(500).send({message: "Fatal error: Insert operation failed"});
         } else {
             console.log("Feedback submitted");
             res.status(200).send({message: "Data successfully inserted"});
         }
     }
 )
})

// Client report
app.get("/clientreport", (req,res) => {
    const sid = req.query.servreqid;
        db.query(`SELECT 
        u.Id , 
        CONCAT(u.First_name, ' ', u.Last_name) AS name, 
        a.Suburb, 
        CONCAT(a.Address,',', a.Suburb,',',a.Postcode) AS full_address,
        u.Phone_number,
        s.sid,
        s.request,
        s.request_desc
        FROM users u
        INNER JOIN address a ON u.id = a.userid
        INNER JOIN service_requests s ON a.userid = s.userid
        WHERE s.sid = ?`,[sid],
            (err, Resultdata) => {
                if(err){
                    console.log(err);
                    res.status(500).send({message: "Fatal error: SELECT error"});
                }
                else{
                    res.status(200).send(Resultdata); // GET always need to pass data to frontend from backend
                }
            }
        )
});

// Professional report
app.get("/professionalreport", (req,res) => {
    const sid = req.query.servreqid;
        db.query(`SELECT 
        u.Id , 
        CONCAT(u.First_name, ' ', u.Last_name) AS name, 
        a.Suburb, 
        CONCAT(a.Address,',', a.Suburb,',',a.Postcode) AS full_address,
        u.Phone_number,
        s.sid,
        s.request,
        s.request_desc,
        f.job_notes
        FROM users u
        INNER JOIN address a ON u.id = a.userid
        INNER JOIN service_requests s ON a.userid = s.userid
        INNER JOIN feedback f ON s.sid = f.servid
        WHERE s.sid = ?`,[sid],
            (err, Resultdata) => {
                if(err){
                    console.log(err);
                    res.status(500).send({message: "Fatal error: SELECT error"});
                }
                else{
                    res.status(200).send(Resultdata); // GET always need to pass data to frontend from backend
                }
            }
        )
});

app.listen(process.env.BACKEND_PORT, () => {
    console.log("Backend listening on " + process.env.BACKEND_PORT) // NOTE: prints to console
})

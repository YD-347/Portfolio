
const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
app.use(express.json()); // To handle JSON requests
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // your MySQL username
  password: "Yuvraj@347",       // your MySQL password
  database: "contact_app"  // your database name
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

// API example
app.post("/api/contact", (req, res) => {
  const { email, message } = req.body;
  const query = "INSERT INTO contacts (email, message) VALUES (?, ?)";
  db.query(query, [email, message], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving message");
      return;
    }
    res.send("Message saved!");
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

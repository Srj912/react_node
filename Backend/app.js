const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json());
// db connection established
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
});

app.post("/users", (req, res) => {
    const sql = "INSERT INTO users(name,email,phoneno) VALUES(?);";
    const values = [req.body.name, req.body.email, req.body.phoneno];
    db.query(sql, [values], (err, data) => {
        err ? res.json(err) : res.json("succesful");
    });
});

app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users ";

    db.query(sql, (err, data) => {
        err ? res.json(err) : res.json(data);
    });
});

app.get("/user/:id", (req, res) => {
    const sql = "SELECT * FROM users WHERE id=?;";
    const id=req.params.id;
    db.query(sql,[id], (err, data) => {
        err ? res.json(err) : res.json(data);
    });
});

app.put("/user/id:", (req, res) => {
    const sql = "UPDATE users SET name = ? , email = ? , phoneno = ? WHERE id = ?";
    const id=req.params.id;
    const values = [req.body.name, req.body.email, req.body.phoneno];
    db.query(sql, [...values,id], (err, data) => {
        err ? res.json(err) : res.json("succesful");
    });
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM users WHERE id=?;";
    db.query(sql, [id], (err, data) => {
        err ? res.json(err) : res.json("succesful");
    });
});
app.listen(3000, () => {
    console.log("3000 port");
});

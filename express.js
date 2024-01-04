const express = require('express');
const mysql = require('mysql');
const path = require("path");


const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());



app.listen(PORT, () => {
    console.log("app is running on " + PORT);
})




const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "zidn",
    password: "AA1122ss",
    database: "mydb"
});

connection.connect((err) => {
    if (!err) {
        console.log("DB connection succeded");
    } else {
        console.log("DB connection failed:" + JSON.stringify(err, undefined, 2));
    }
    console.log(connection.state)


})


app.get("/fetch-all-users", (req, res) => {
    connection.query("SELECT * FROM user", (err, rows,
        fields) => {
        res.json(rows);
    })
})

app.post('/create', (req, res) => {
    const body = req.body;
    if (!body) {
        return res.sendStatus(400);
    }

    connection.query("INSERT INTO user SET ? ", {
        name: body.name,
        emali: body.email
    }, (err, rows,
        fields) => {

        if (err) throw err;
        res.sendStatus(200);



    })
})


app.delete('/delete', (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.sendStatus(400);
    }

    connection.query("DELETE FROM user WHERE id = " + id,
        (err, rows, feilds) => {
            if (err) throw err;
            res.sendStatus(200);
        })
})

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.sendStatus(400);
    }

    connection.query("SELECT * FROM user WHERE id = " + id, (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
    })
})
app.post("/update", (req, res) => {
    const body = req.body;
    if (!body) {
        return res.sendStatus(200);
    }
    connection.query("UPDATE user SET ? WHERE id = " + body.id, {
        name: body.name,
        emali: body.email
    }, (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
    })
})
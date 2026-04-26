const express = require("express");
const mysql = require('mysql2');

const app = express();

app.use(express.json());

const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'',
        database:'restaurante'
    });

app.post('/favorito',(req,res)=>{
    let produto = req.body.produto;

    db.query(
        'INSERT INTO favoritos (produto_id)VALUES (?)' ,[produto]
    );

    res.send('ok');
});

app.Liste(3000);


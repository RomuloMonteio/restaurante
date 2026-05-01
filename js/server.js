const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'restaurante'
});

db.connect((err)=>{
if(err){
console.log("Erro BD");
}else{
console.log("Ligado ao MySQL");
}
});

app.post('/favorito',(req,res)=>{

let produto = req.body.produto;

db.query(
'INSERT INTO favoritos(produto_id) VALUES (?)',
[produto]
);

res.send("Guardado");

});

app.listen(3000,()=>{
console.log("Servidor rodando");
});
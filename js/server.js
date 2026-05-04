//Criar a conecao


const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors);
app.use(express.json());

const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'',
        database:'restaurantes'

    });

db.connect(err=> {
    if(err){
        console.log('erro ao ligar a BD');
    }else{
        console.log('BD is running');
    }
});


//criar Encomenda
app.post('/encomenda',(req,res)=>
{
    let {nome,produto,quantidade,data_entrega,hora_entrega} = req.body;

    db.query("INSERT INTO encomendas VALUES (?,?,?,?,?)",[nome,produto,quantidade,data_entrega,hora_entrega]);

    res.send("Encomenda Feita");
});


//VER encomenda

app.get('/encomendas',(req,res)=>
{
    db.query("SELECT * FROM encomendas",(err,result)=>{
        res.json(result);
    });
});


//ligar
app.listen(3000,()=>
{
    console.log("Servidor rodando")
});
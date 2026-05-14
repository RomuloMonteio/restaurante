//Criar a conecao

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
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
    let {nome,telefone,produto,quantidade,restaurante,data_entrega,hora_entrega,descricao,valor_total} = req.body;

    db.query(
        "INSERT INTO encomendas(nome,telefone,produto,quantidade,restaurante,data_entrega,hora_entrega,descricao,valor_total) VALUES (?,?,?,?,?,?,?,?,?)",
        [nome,telefone||'',produto,quantidade||1,restaurante||'',data_entrega,hora_entrega,descricao||'',valor_total||0],
        (err,result)=>
        {
            if(err){
                console.log(err);
                res.status(500).json({erro:'Erro ao guardar encomenda'});
            }else{
                res.json({mensagem:'Encomenda registada com sucesso', id: result.insertId});
            }
        }
    );
});


//VER encomenda

app.get('/encomenda',(req,res)=>
{
    db.query("SELECT * FROM encomendas",(err,result)=>{
        res.json(result);
    });
});


//criar Reserva
app.post('/reserva',(req,res)=>
{
    let {nome,contacto,data_reserva,hora_reserva,restaurante,num_pessoas,notas} = req.body;

    db.query(
        "INSERT INTO reservas(nome,contacto,data_reserva,hora_reserva,restaurante,num_pessoas,notas) VALUES (?,?,?,?,?,?,?)",
        [nome,contacto,data_reserva,hora_reserva,restaurante,num_pessoas,notas||''],
        (err,result)=>
        {
            if(err){
                console.log(err);
                res.status(500).json({erro:'Erro ao guardar reserva'});
            }else{
                res.json({mensagem:'Reserva registada com sucesso', id: result.insertId});
            }
        }
    );
});


//VER reservas
app.get('/reserva',(req,res)=>
{
    db.query("SELECT * FROM reservas ORDER BY data_reserva, hora_reserva",(err,result)=>{
        if(err){ return res.status(500).json({erro:'Erro'}); }
        res.json(result);
    });
});


//ligar
app.listen(3000,()=>
{
    console.log("Servidor rodando");
});
CREATE DATABASE restaurantes;


CREATE TABLE encomendas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    produto VARCHAR(100),
    quantidade INT,
    data_entrega DATE,
    hora_entrega TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE DATABASE restaurantes;


CREATE TABLE encomendas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    telefone VARCHAR(20),
    produto VARCHAR(100),
    quantidade DECIMAL(6,2),
    restaurante VARCHAR(50),
    data_entrega DATE,
    hora_entrega TIME,
    descricao TEXT,
    valor_total DECIMAL(8,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* ============================================================
   MIGRAÇÃO — corre estes comandos no MySQL se a tabela
   encomendas JÁ EXISTIR (não corras o CREATE TABLE acima):
   ============================================================
   ALTER TABLE encomendas
     ADD COLUMN telefone VARCHAR(20) AFTER nome,
     ADD COLUMN restaurante VARCHAR(50) AFTER quantidade,
     ADD COLUMN descricao TEXT AFTER hora_entrega,
     ADD COLUMN valor_total DECIMAL(8,2) DEFAULT 0 AFTER descricao,
     MODIFY COLUMN quantidade DECIMAL(6,2);
*/

CREATE TABLE reservas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    contacto VARCHAR(120),
    data_reserva DATE,
    hora_reserva TIME,
    restaurante VARCHAR(50),
    num_pessoas INT DEFAULT 2,
    notas TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

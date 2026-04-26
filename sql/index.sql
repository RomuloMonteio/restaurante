CREATE TABLE favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    ip_cliente VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE produtos (
   id INT AUTO_INCREMENT PRIMARY KEY,
   nome VARCHAR(200),
   descricao TEXT,
   preco DECIMAL(10,2),
   imagem TEXT
);
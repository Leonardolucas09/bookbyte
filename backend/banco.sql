-- Cria o banco e as tabelas do BookByte.
-- Rode uma vez no MySQL antes de subir a API.

CREATE DATABASE IF NOT EXISTS bookbyte;
USE bookbyte;

-- Usuários do sistema
CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL, -- a senha nunca é salva, só o hash dela
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Dados do livro, que vêm da Open Library.
-- Cada livro é salvo uma vez só e reaproveitado por todos os usuários (ADR-005).
CREATE TABLE IF NOT EXISTS livro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255),
    editora VARCHAR(255),
    ano INT,
    paginas INT,
    isbn VARCHAR(13),
    capa VARCHAR(255)
);

-- A estante de cada usuário: qual livro ele tem, o status e o progresso.
-- Status e progresso ficam aqui porque são de cada leitor, não do livro (DAS).
CREATE TABLE IF NOT EXISTS item_estante (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    status_leitura VARCHAR(20) NOT NULL DEFAULT 'Quero Ler',
    paginas_lidas INT NOT NULL DEFAULT 0,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (usuario_id, livro_id), -- o mesmo livro não entra duas vezes na estante
    FOREIGN KEY (usuario_id) REFERENCES usuario (id),
    FOREIGN KEY (livro_id) REFERENCES livro (id)
);

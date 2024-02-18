
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Abrir a conexão com o banco de dados SQLite3
const db = new sqlite3.Database('users.db');

// Criar uma tabela para armazenar os usuários
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)");
});

app.use(bodyParser.json());
app.use(cors());

// Rota para cadastrar um novo usuário
app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body;
  
  // Inserir o novo usuário no banco de dados
  db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
    }
    // Retornar o ID do novo usuário cadastrado
    res.status(201).json({ id: this.lastID, name, email });
  });
});

// Rota para listar todos os usuários
app.get('/api/users', (req, res) => {
  // Selecionar todos os usuários do banco de dados
  db.all("SELECT id, name, email FROM users", (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
    res.json(rows);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

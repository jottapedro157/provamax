const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());                         
app.use(bodyParser.json());              

const users = [
  { id: 1, username: 'admin',   password: '1234'    },
  { id: 2, username: 'joao',    password: 'senha123' },
  { id: 3, username: 'maria',   password: 'abc456'   },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (
    !username ||
    !password ||
    username.includes(';') ||
    password.includes(';')
  ) {
    return res.status(400).json({
      error: 'Entrada inválida. Verifique os campos ou caracteres proibidos.',
    });
  }

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Usuário ou senha incorretos.' });
  }

  return res.status(200).json({
    message: `Bem-vindo, ${user.username}! Login realizado com sucesso.`,
    userId: user.id,
  });
});

app.listen(PORT, () => {
  console.log(`✅  Servidor rodando em http://localhost:${PORT}`);
});

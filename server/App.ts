import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json());

const JWT_SECRET = 'minhaChaveSecreta123'; // Em produção, use variáveis de ambiente

// Usuário de exemplo (em um cenário real, isso viria de um banco de dados)
const user = {
  id: 1,
  email: "teste@exemplo.com",
  // Senha: "senha123" encriptada
  password: bcrypt.hashSync("senha123", 8)
};

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email !== user.email) {
    return res.status(401).json({ message: "Usuário não encontrado" });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: "Senha incorreta" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: 86400 });
  return res.json({ token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

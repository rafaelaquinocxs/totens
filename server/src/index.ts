import express from "express";
import mediaRoutes from "./routes/media";

const app = express();
const PORT = 3000;

app.use(express.json()); // Permite que o servidor entenda JSON
app.use("/api", mediaRoutes); // Usa as rotas de mídia

app.get("/health", (req, res) => {
  res.json({ message: "Servidor funcionando!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
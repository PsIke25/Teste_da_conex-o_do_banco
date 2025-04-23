import express from "express";
import usuarioController from "./controllers/usuarioController.js";
import browseAiClient from "./clients/browseAiClient.js";
import login from './controllers/loginController.js';
import db from "../src/repository/mysql.js"; // Conexão com o banco de dados

const rotas = express();

// Definindo as rotas
rotas.use("/usuario", usuarioController);
rotas.use("/API", browseAiClient);
rotas.use("/login", login);

// Rota para buscar vestibulares diretamente
rotas.get("/vestibular", async (req, res) => {
  try {
    // Conectando ao banco
    const connection = await db.connectDB();
    
    // Consultando os vestibulares no banco de dados
    const [rows] = await connection.execute("SELECT * FROM vestibulares"); // Ajuste a consulta de acordo com a sua tabela

    // Retornando os dados dos vestibulares em formato JSON
    res.json(rows);

    // Finalizando a conexão com o banco de dados
    connection.end();
  } catch (error) {
    console.error("Erro ao buscar vestibulares:", error);
    res.status(500).json({ message: "Erro ao carregar os vestibulares." });
  }
});

export default rotas;

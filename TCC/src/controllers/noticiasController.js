import express from 'express';
import connectDB from '../repository/mysql.js';


const noticiasRouter = express.Router();

noticiasRouter.get("/", async (req, res) => {
    try {
        const connection = await connectDB.connectDB();
        const [rows] = await connection.query("SELECT * FROM noticias ORDER BY id DESC LIMIT 5");
        res.status(200).json(rows);
    } catch (err) {
        console.error("Erro ao buscar notícias:", err);
        res.status(500).json({ message: "Erro ao buscar notícias" });
    }
});

export default noticiasRouter;

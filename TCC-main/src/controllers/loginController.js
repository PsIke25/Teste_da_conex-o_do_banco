import exress from 'express';
import loginService from '../services/loginService.js'
const rota = exress.Router();
const {buscarUsuarioPorEmail} = loginService;
rota.get('/', async (req, res) => {
    const { email } = req.query;
    console.log("Email recebido:", email);

    try {
        const user = await buscarUsuarioPorEmail(email); // agora vai encontrar a função

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        res.status(200).json(user);

    } catch (err) {
        console.error("Erro ao buscar no banco:", err);
        res.status(500).json({ message: `Erro no banco de dados: ${err}` });
    }
});


export default rota
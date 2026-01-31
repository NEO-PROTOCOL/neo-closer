import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Habilitar CORS para que exploradores de blocos possam ler os metadados
app.use(cors());

// Servir a pasta 'api' como estática
// Isso permite acessar: /api/jetton/neoflw.json
app.use('/api', express.static(path.join(__dirname, 'api')));

app.get('/', (req, res) => {
    res.json({
        status: 'online',
        service: 'NΞØ SMART FACTORY Metadata Server',
        version: '1.0.0',
        documentation: 'https://nsfactory.xyz'
    });
});

app.listen(port, () => {
    console.log(`🚀 NSFactory Meta Server rodando na porta ${port}`);
});

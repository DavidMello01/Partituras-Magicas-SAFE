const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/albums/:band', (req, res) => {
    const band = req.params.band.toLowerCase();
    const filePath = path.join(__dirname, 'data', `${band}.json`);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).json({ error: 'Álbum não encontrado' });  // Corrigir status para 404
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
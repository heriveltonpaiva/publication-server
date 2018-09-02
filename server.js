const express = require('express');
const app = express();

app.get("/", function(req, res) {
    res.send("<h1>Servidor rodando com ExpressJS</h1>");
});

app.listen(4200, () => {
    console.log("Servidor NodeJS rodando na porta 4200");
});


 


const express = require("express");
const app = express();

app.use(express.json());

const eventosRouter = require('../routers/eventos.router');

app.use('/eventos', eventosRouter);

app.get("/", (req, res) => {
    res.send("HOLA NODE EXPRESS!!!!!"); //ruta principal
});

app.get("/agenda", (req, res) => {
    // hacer el login acá para acceder a las rutas
    res.sendFile(__dirname + "/privada/agenda.html");
});

const PORT = 3000;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));


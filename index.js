const express = require("express");
const app = express();

app.use(express.json());

const eventosRouter = require('./routers/eventos.router');

app.use('/db/eventos', eventosRouter);

app.get("/", (req, res) => {
    res.send("HOLA NODE EXPRESS!!!!!"); //ruta principal
});

const PORT = 3000;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));


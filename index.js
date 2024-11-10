const express = require("express");
const app = express();

app.use(express.json());

const eventosRouter = require('./routers/eventos.routes');
app.use('/db/eventos', eventosRouter);

const productosRouter = require('./routers/productos.routes');
app.use('/db/productos', productosRouter);

const categoriasRouter = require('./routers/categorias.routes');
app.use('/db/categorias', categoriasRouter);


app.get("/", (req, res) => {
    res.send("HOLA NODE EXPRESS!!!!!"); //ruta principal
});

const PORT = 3000;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));


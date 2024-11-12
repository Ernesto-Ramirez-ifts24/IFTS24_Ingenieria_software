const express = require("express");
const app = express();

app.use(express.json());

const eventosRouter = require('./routers/eventos.routes');
app.use('/db/eventos', eventosRouter);

const productosRouter = require('./routers/productos.routes');
app.use('/db/productos', productosRouter);

const categoriasRouter = require('./routers/categorias.routes');
app.use('/db/categorias', categoriasRouter);

const usuariosRouter = require('./routers/usuarios.routes');
app.use('/db/usuarios', usuariosRouter);

const novedadesRouter = require('./routers/novedades.routes');
app.use('/db/novedades', novedadesRouter);

const promocionesRouter = require('./routers/promociones.routes');
app.use('/db/promociones', promocionesRouter);

app.get("/", (req, res) => {
    res.send("HOLA NODE EXPRESS!!!!!"); //ruta principal
});

const PORT = 3000;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));


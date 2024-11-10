const db = require("../db/db");

const all_productos = (req, res) => {
    const sql = "SELECT * FROM productos";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error:"Intente más tarde"});
        }
        res.json(rows);
    });
};

const show_productos = (req, res) =>{
    const {id} = req.params;
    const sql = "SELECT * FROM productos WHERE id = ?";
    db.query(sql, [id], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error:"intente más tarde"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "No existe el producto"});
        }
        res.json(rows[0]);
    });
    
};

const store_productos = (req, res) => {
    console.log(req.file);
    let img_producto="";
    if (req.file){
        img_producto = req.file.filename;
    };


    const {nombre, descripcion, precio, stock} = req.body;
    const sql = "INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url) VALUES (?,?,?,?,?)";
    db.query(sql,[nombre, descripcion, precio, stock, img_producto], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        const producto = {...req.body, id: result.insertId}; // ... los uso para reconstruir ese objeto

        res.status(201).json(producto); // le envio un elemento, el que existe
    });
};

const update_productos = (req, res) => {
    const {id} = req.params;
    const {nombre, descripcion, precio, stock, imagen_url} = req.body;
    const sql = "UPDATE productos SET nombre = ?, decripcion = ?, precio = ?, stock = ?, imagen_url = ?, WHERE id = ?";
    db.query(sql,[nombre, descripcion, precio, stock, imagen_url, id], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error : "No existe el producto"}); 
        };
        const producto = {...req.body, ...req.params}; // ... los uso para reconstruir ese objeto

        res.json(producto); // le envio un elemento, el que existe

    });
};

const destroy_productos = (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM producto WHERE id = ?";
    db.query(sql,[id], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error : "No existe el producto"}); 
        };
        res.json({mensaje : "Producto Eliminado"});

    });
};


module.exports = {
    all_productos,
    show_productos,
    store_productos,
    update_productos,
    destroy_productos
};
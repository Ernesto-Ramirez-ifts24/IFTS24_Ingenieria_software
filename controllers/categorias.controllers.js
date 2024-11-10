const db = require("../db/db");

//GET
const all_categorias = (req, res) => {
    const sql = "SELECT * FROM categorias";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error:"Intente más tarde"});
        }
        res.json(rows);
    });
};

const show_categorias = (req, res) =>{
    const {id_categoria} = req.params;
    const sql = "SELECT * FROM categorias WHERE id_categoria = ?";
    db.query(sql, [id_categoria], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error:"intente más tarde"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "No existe la categoria"});
        }
        res.json(rows[0]);
    });
    
};
//POST
const store_categorias = (req, res) => {
    const {nombre_categoria} = req.body;
    const sql = "INSERT INTO categorias (nombre_categoria) VALUES (?)";
    db.query(sql,[nombre_categoria], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        const categoria= {...req.body, id_categoria: result.insertId}; // ... los uso para reconstruir ese objeto

        res.status(201).json(categoria); // le envio un elemento, el que existe
    });
};
//SET
const update_categorias = (req, res) => {
    const {id_categoria} = req.params;
    const {nombre_categoria} = req.body;
    const sql = "UPDATE categorias SET nombre_categoria = ? WHERE id_categoria = ?";
    db.query(sql,[nombre_categoria, id_categoria], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error : "No existe la categoria"}); 
        };
        const categoria = {...req.body, ...req.params}; // ... los uso para reconstruir ese objeto

        res.json(categoria); // le envio un elemento, el que existe

    });
};
//DELETE
const destroy_categorias = (req, res) => {
    const {id_categoria} = req.params;
    const sql = "DELETE FROM categorias WHERE id_categoria = ?";
    db.query(sql,[id_categoria], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error : "No existe la categoria"}); 
        };
        res.json({mensaje : "Categoria Eliminada"});

    });
};


module.exports = {
    all_categorias,
    show_categorias,
    store_categorias,
    update_categorias,
    destroy_categorias
};
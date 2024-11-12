const db = require("../db/db");

//GET
const all_novedades = (req, res) => {
    const sql = "SELECT * FROM novedades";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error:"Intente más tarde"});
        }
        res.json(rows);
    });
};

const show_novedades = (req, res) =>{
    const {id_novedades} = req.params;
    const sql = "SELECT * FROM novedades WHERE id_novedades = ?";
    db.query(sql, [id_novedades], (error, rows) => {
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
const store_novedades = (req, res) => {
    const {titulo_novedades, contenido_novedades} = req.body;
    const sql = "INSERT INTO novedades (titulo_novedades, contenido_novedades) VALUES (?,?)";
    db.query(sql,[titulo_novedades, contenido_novedades], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        const novedades= {...req.body, id_novedades: result.insertId}; // ... los uso para reconstruir ese objeto

        res.status(201).json(novedades); // le envio un elemento, el que existe
    });
};
//SET
const update_novedades = (req, res) => {
    const {id_novedades} = req.params;
    const {titulo_novedades, contenido_novedades} = req.body;
    const sql = "UPDATE novedades SET  titulo_novedades = ?, contenido_novedades = ? WHERE id_novedades = ?";
    db.query(sql,[titulo_novedades, contenido_novedades, id_novedades], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error : "No existe la publicación"}); 
        };
        const novedades = {...req.body, ...req.params}; // ... los uso para reconstruir ese objeto

        res.json(novedades); // le envio un elemento, el que existe

    });
};
//DELETE
const destroy_novedades = (req, res) => {
    const {id_novedades} = req.params;
    const sql = "DELETE FROM novedades WHERE id_novedades = ?";
    db.query(sql,[id_novedades], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error : "No existe la publicación"}); 
        };
        res.json({mensaje : "Publicación Eliminada"});

    });
};


module.exports = {
    all_novedades,
    show_novedades,
    store_novedades,
    update_novedades,
    destroy_novedades
};
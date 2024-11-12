const db = require("../db/db");

//GET
const all_promociones = (req, res) => {
    const sql = "SELECT * FROM promociones";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error:"Intente más tarde"});
        }
        res.json(rows);
    });
};

const show_promociones = (req, res) =>{
    const {id_promociones} = req.params;
    const sql = "SELECT * FROM promociones WHERE id_promocion = ?";
    db.query(sql, [id_promociones], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error:"intente más tarde"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "No existe la promocion"});
        }
        res.json(rows[0]);
    });
    
};
//POST
const store_promociones = (req, res) => {
    const {nombre_promocion, descripcion, descuento_porcentaje} = req.body;
    const sql = "INSERT INTO promociones (nombre_promocion, descripcion, descuento_porcentaje) VALUES (?,?,?)";
    db.query(sql,[nombre_promocion, descripcion, descuento_porcentaje], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        const promociones= {...req.body, id_novedades: result.insertId}; // ... los uso para reconstruir ese objeto

        res.status(201).json(promociones); // le envio un elemento, el que existe
    });
};
//SET
const update_promociones = (req, res) => {
    const {id_promocion} = req.params;
    const {nombre_promocion, descripcion, descuento_porcentaje} = req.body;
    const sql = "UPDATE promociones SET  nombre_promocion = ?, descripcion = ?, descuento_porcentaje = ? WHERE id_promocion = ?";
    db.query(sql,[nombre_promocion, descripcion, descuento_porcentaje, id_promocion], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error : "No existe la promoción"}); 
        };
        const promociones = {...req.body, ...req.params}; // ... los uso para reconstruir ese objeto

        res.json(promociones); // le envio un elemento, el que existe

    });
};
//DELETE
const destroy_promociones = (req, res) => {
    const {id_promocion} = req.params;
    const sql = "DELETE FROM promociones WHERE id_promocion = ?";
    db.query(sql,[id_promocion], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error : "No existe la promoción"}); 
        };
        res.json({mensaje : "Promoción Eliminada"});

    });
};


module.exports = {
    all_promociones,
    show_promociones,
    store_promociones,
    update_promociones,
    destroy_promociones
};
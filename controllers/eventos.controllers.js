const db = require("../db/db");

const index = (req, res) => {
    const sql = "SELECT * FROM eventos";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error:"Intente más tarde"});
        }
        res.json(rows);
    });
};

const show = (req, res) =>{
    const {id} = req.params;
    const sql = "SELECT * FROM eventos WHERE id = ?";
    db.query(sql, [id], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error:"intente más tarde"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "No existe el evento"});
        }
        res.json(rows[0]);
    });
    
};

const store = (req, res) => {
    const {nombre_lugar, fecha} = req.body;
    const sql = "INSERT INTO eventos (nombre_lugar, fecha) VALUES (?,?)";
    db.query(sql,[nombre_lugar, fecha], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        const evento = {...req.body, id: result.insertId}; // ... los uso para reconstruir ese objeto

        res.status(201).json(evento); // le envio un elemento, el que existe
    });
};

const update = (req, res) => {
    const {id} = req.params;
    const {nombre_lugar, fecha} = req.body;
    const sql = "UPDATE eventos SET nombre_lugar = ?, fecha = ? WHERE id = ?";
    db.query(sql,[nombre_lugar, fecha, id], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error : "No existe el evento"}); 
        };
        const evento = {...req.body, ...req.params}; // ... los uso para reconstruir ese objeto

        res.json(evento); // le envio un elemento, el que existe

    });
};

const destroy = (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM eventos WHERE id = ?";
    db.query(sql,[id], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error : "No existe el evento"}); 
        };
        res.json({mensaje : "Evento Eliminado"});

    });
};


module.exports = {
    index,
    show,
    store,
    update,
    destroy
};
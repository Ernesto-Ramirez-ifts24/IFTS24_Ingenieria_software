const jwt = require("jsonwebtoken"); //importacion de modulo webtoken
const bcrypt = require("bcryptjs");  //importacion de modulo encriptacion


const db = require("../db/db");

const all_usuarios = (req, res) => {
    const sql = "SELECT * FROM usuarios";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error:"Intente más tarde"});
        }
        res.json(rows);
    });
};

const show_usuarios = (req, res) =>{
    const {id_usuario} = req.params;
    const sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
    db.query(sql, [id_usuario], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error:"intente más tarde"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "No existe el usuario"});
        }
        res.json(rows[0]);
    });
    
};

const store_usuarios = (req, res) => {
    console.log(req.file);
    let imagenUsu="";
    if (req.file){
        imagenUsu = req.file.filename;
    };


    const {nombre_usuario, apellido_usuario, email_usuario, contrasena} = req.body;
    if(!nombre_usuario || !apellido_usuario || !email_usuario || !contrasena){
        return res.status(400).send("No se aceptan camos vacíos");
    }

    // Encriptacion

    bcrypt.hash(contrasena,8,(err,hashedPassword)=>{
        if(err){
            return res.status(500).send("Error de encriptación")
        }

        const sql = "INSERT INTO usuarios (nombre_usuario, apellido_usuario, email_usuario, contrasena, imagen_usuario) VALUES (?,?,?,?,?)";
        db.query(sql,[nombre_usuario, apellido_usuario, email_usuario, hashedPassword, imagenUsu], (error, result) => {
            console.log(result);
            if(error){
                return res.status(500).json({error: "Intente mas tarde por favor"});
            };
            const usuario = {...req.body, id: result.insertId}; // ... los uso para reconstruir ese objeto

            res.status(201).json(usuario); // le envio un elemento, el que existe
        });
    })
};

const update_usuarios = (req, res) => {
    const {id_usuario} = req.params;
    const {nombre_usuario, apellido_usuario, email_usuario, contrasena, imagen_usuario} = req.body;
    const sql = "UPDATE usuarios SET nombre_usuario = ?, apellido_usuario = ?, email_usuario = ?, contrasena = ?, imagen_usuario = ? WHERE id_usuario = ?";
    db.query(sql,[nombre_usuario, apellido_usuario, email_usuario, contrasena, imagen_usuario, id_usuario], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error : "No existe el usuario"}); 
        };
        const usuarios = {...req.body, ...req.params}; // ... los uso para reconstruir ese objeto

        res.json(usuarios); // le envio un elemento, el que existe

    });
};

const destroy_usuarios = (req, res) => {
    const {id_usuario} = req.params;
    const sql = "DELETE FROM usuarios WHERE id_usuario = ?";
    db.query(sql,[id_usuario], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "Intente mas tarde por favor"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error : "No existe el usuario"}); 
        };
        res.json({mensaje : "Usuario Eliminado"});

    });
};


module.exports = {
    all_usuarios,
    show_usuarios,
    store_usuarios,
    update_usuarios,
    destroy_usuarios
};
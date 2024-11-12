const express = require('express');
const router = express.Router();

// MULTER 
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'img_usuarios');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname)); // segundos desde 1970
    },
});



const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        console.log(file);
        const fileTypes = /jpg|jpeg|png|webp/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        if(mimetype && path.extname) {
            return cb(null, true);
        };
        cb("Tipo de archivo no soportado");
    },
    limits: {fileSize: 1024 * 1024 * 1}, // aprox 1Mb
});




const controller = require("../controllers/usuarios.controllers");

// GET

router.get('/', controller.all_usuarios);

router.get('/:id_usuario', controller.show_usuarios);


// POST

router.post('/',upload.single("imagen_usuario"), controller.store_usuarios);


// PUT 

router.put('/:id_usuario', controller.update_usuarios);


// DELETE 

router.delete('/:id_usuario', controller.destroy_usuarios);


module.exports = router;